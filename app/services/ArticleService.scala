package services

import java.io.{ByteArrayInputStream, File}
import java.nio.file.{Files, Paths}
import java.util.Base64
import java.util.concurrent.atomic.AtomicInteger
import java.util.regex.Pattern
import javax.imageio.ImageIO
import javax.inject.Singleton

import com.google.inject.ImplementedBy
import models.CoreModels.{Article, Tag, Translation}
import net.coobird.thumbnailator.Thumbnails
import org.apache.commons.lang3.StringUtils
import org.joda.time.DateTime
import play.api.Logger
import play.api.i18n.Lang
import scalikejdbc.{DB, DBSession}
import services.Utils.loggedFailure
import utils.Configuration

import scala.util.{Random, Success, Try}

/**
  * Created by ezhulkov on 17.08.16.
  */
@ImplementedBy(classOf[ArticleServiceImpl])
trait ArticleService {

  def allArticles(onlyPublished: Boolean = true): Seq[Article]
  def allTagged(tag: String): Seq[Article]
  def findArticle(id: Long): Option[Article]
  def findArticleByOldUrl(url: String): Option[Article]
  def findArticle(url: String, lang: Lang = LangUtils.defaultLang): Option[Article]
  def deleteArticle(id: Long)
  def saveArticle(article: Article): Try[Long]
  def allTags: Set[Tag]
  def allTags(text: Set[String]): Set[Tag]
  def allRootTags: Set[Tag]
  def search(q: String): Seq[Article]
  def extractImages(translation: Translation): Try[Translation]
  def deleteCoverPhoto(translationId: Long)
  def attachCoverPhoto(translationId: Long, file: File)
  def storeGalleryUpload(caption: Option[String], lang: Option[String], file: File): String

}

@Singleton
class ArticleServiceImpl extends ArticleService {

  private lazy val imgPattern        = Pattern.compile("""<img\s*src=("data.*?base64,.*?")""")
  private lazy val b64Pattern        = Pattern.compile("""".*?base64,(.*)"""")
  private      val imageFolder       = Configuration.getValue("image.folder").getOrElse("/tmp")
  private      val imageUrl          = Configuration.getValue("image.url").getOrElse("/media")
  private      val articleImageWidth = Configuration.getValue("iamge.width").getOrElse(1040)
  private      val rnd               = new Random()

  override def allTags: Set[Tag] = Mappers.Tag.findAll().toSet
  override def allArticles(onlyPublished: Boolean = true): Seq[Article] = Mappers.Article.findAll(onlyPublished)
  override def findArticle(id: Long): Option[Article] = Mappers.Article.findById(id).map(joinCrossLinks)
  override def deleteArticle(id: Long): Unit = Mappers.Article.deleteById(id)
  override def allRootTags: Set[Tag] = Mappers.Tag.findAllRoot()
  override def allTags(text: Set[String]): Set[Tag] = Mappers.Tag.allTags(text.toSeq)
  override def saveArticle(article: Article): Try[Long] = DB.localTx { implicit session =>
    for {
      article <- tryExtractImages(article)
      articleId <- trySaveArticle(article)
      articleId <- trySaveCrossLinks(article, articleId)
      articleId <- trySaveTags(article, articleId)
      articleId <- trySaveTranslations(article, articleId)
    } yield articleId
  }
  override def allTagged(tag: String): Seq[Article] = {
    val tagged = Mappers.Article.findAllTagged(tag: String)
    Mappers.Article.findAllByIdsSeq(tagged.map(t => t.id.getOrElse(0L))).sortBy(t => -t.publish.getMillis)
  }
  override def search(q: String): Seq[Article] = {
    if (StringUtils.isEmpty(q)) Nil
    else {
      val allNews = Mappers.Article.findAll(true)
      allNews.filter { article =>
        article.translations.flatMap(t => Seq(t.caption, t.text).flatten).map(_.toLowerCase).distinct.exists(text => text.contains(q.toLowerCase))
      }
    }
  }
  override def findArticleByOldUrl(url: String) = Mappers.Article.findByUrl(url)
  override def findArticle(url: String, lang: Lang = LangUtils.defaultLang): Option[Article] = Mappers.Article.findByShortUrl(url).map(joinCrossLinks)
  override def extractImages(translation: Translation): Try[Translation] = Try {
    val caption = translation.caption.getOrElse("barracuda image")
    translation.text match {
      case Some(text) =>
        val imgCount = StringUtils.countMatches(text, "<img")
        val imgMatcher = imgPattern.matcher(text)
        val out = new StringBuffer()
        val counter = new AtomicInteger(imgCount + 1)
        while (imgMatcher.find()) {
          if (imgMatcher.groupCount() == 1) {
            val data = imgMatcher.group(1)
            val b64Matcher = b64Pattern.matcher(data)
            if (b64Matcher.find()) {
              val base64Data = b64Matcher.group(1)
              val fileName = decodeAndStore(translation.caption.getOrElse(DateTime.now().toString), Some(translation.lang), Some(counter.incrementAndGet()), base64Data)
              imgMatcher.appendReplacement(out, s"""<img alt="$caption" title="$caption" class="article-image" src="$imageUrl/$fileName" ${translation.caption.map(t => s"title='$t' alt='$t'").getOrElse("")}""")
            }
          }
        }
        val extractedText = imgMatcher.appendTail(out).toString
        translation.copy(text = Some(extractedText))
      case None =>
        translation
    }
  }
  override def storeGalleryUpload(caption: Option[String], lang: Option[String], file: File): String = {
    val url = decodeAndStore(caption.getOrElse("gallery-image"), lang.map(l => Lang(l)), Some(rnd.nextInt(1000)), file)
    s"$imageUrl/$url"
  }
  override def deleteCoverPhoto(translationId: Long): Unit = DB.localTx { implicit session =>
    Mappers.Translation.deleteCover(translationId)
  }
  override def attachCoverPhoto(translationId: Long, file: File) = DB.localTx { implicit session =>
    Mappers.Translation.findById(translationId) match {
      case Some(translation) =>
        val bytes = Files.readAllBytes(Paths.get(file.toURI))
        val savedFile = decodeAndStore(translation.caption.getOrElse(DateTime.now().toString), None, None, bytes)
        val newTranslation = translation.copy(coverMedia = Some(s"$imageUrl/$savedFile"), coverMediaLength = Some(new File(savedFile).length().toInt))
        Mappers.Translation.updateCover(newTranslation)
      case _ => Logger.error(s"Can not find article $translationId")
    }
  }
  private def decodeAndStore(caption: String, lang: Option[Lang], number: Option[Int], bytes: Array[Byte]): String = {
    val image = ImageIO.read(new ByteArrayInputStream(bytes))
    val resized = if (image.getWidth > articleImageWidth) {
      Thumbnails.of(image).width(articleImageWidth).keepAspectRatio(true).asBufferedImage
    } else {
      image
    }
    val fileName = s"${Utils.transliterate(caption)}${lang.map(l => s"-${l.code}").getOrElse("")}${number.map(n => s"-$n").getOrElse("")}.jpg"
    val file = new File(s"$imageFolder/$fileName")
    ImageIO.write(resized, "jpg", file)
    fileName
  }
  private def decodeAndStore(caption: String, lang: Option[Lang], number: Option[Int], file: File): String = {
    val bytes = Files.readAllBytes(Paths.get(file.toURI))
    decodeAndStore(caption, lang, number, bytes)
  }
  private def decodeAndStore(caption: String, lang: Option[Lang], number: Option[Int], base64Data: String): String = decodeAndStore(caption, lang, number, Base64.getDecoder.decode(base64Data))
  private def joinCrossLinks(article: Article) = {
    val links = Mappers.CrossLinkArticle.findByArticle(article)
    val articles = Mappers.Article.findAllByIdsSeq(links.map(t => t.linkId))
    article.withCrossLinks(articles)
  }

  private def tryExtractImages(article: Article): Try[Article] = Try {
    val extracted = article.translations
      .map { translation => extractImages(translation).recoverWith(loggedFailure()) }
      .collect { case Success(x) => x }
    article.copy(translations = extracted)
  }
  private def trySaveArticle(article: Article)(implicit s: DBSession): Try[Long] = {
    article.id match {
      case Some(id) =>
        val shortUrl = article.shortUrl.getOrElse(article.generateUrl())
        val articleToSave = Mappers.Article.findByShortUrlAndNotId(shortUrl, id) match {
          case Some(_) => article.copy(shortUrl = Some(article.generateUrl(idOpt = Some(id))))
          case _ => article.copy(shortUrl = Some(shortUrl))
        }
        Mappers.Article.update(articleToSave)
        Success(id)
      case None =>
        val result = Mappers.Article.create(article)
        Mappers.Article.update(article)
        result
    }
  }
  private def trySaveCrossLinks(article: Article, articleId: Long)(implicit s: DBSession): Try[Long] = Try {
    Mappers.CrossLinkArticle.deleteForArticle(articleId)
    article.crossLinks.getOrElse(Nil).filter(t => t != 0).map { link =>
      Mappers.CrossLinkArticle.create(articleId, link).recoverWith(loggedFailure())
    }
    articleId
  }
  private def trySaveTranslations(article: Article, articleId: Long)(implicit s: DBSession): Try[Long] = Try {
    article.translations.map { translation =>
      Mappers.Translation.findByLang(articleId, translation.lang) match {
        case Some(a) => Mappers.Translation.update(translation, a.id.get)
        case None => Mappers.Translation.create(articleId, translation.lang, translation)
      }
    }
    articleId
  }
  private def trySaveTags(article: Article, articleId: Long)(implicit s: DBSession): Try[Long] = Try {
    val existingTags = Mappers.Tag.allTags(article.tags.map(t => t.text.orNull))
    val newTags = article.tags.filterNot(t => existingTags.exists(m => m.text == t.text))
    val createdTags = newTags.map(t => Mappers.Tag.create(t.text.orNull))
      .map(t => t.recoverWith(loggedFailure()))
      .collect { case Success(tag) => tag }
    val tagIds = existingTags.flatMap(t => t.id) ++ createdTags
    Mappers.ArticleTag.deleteForArticle(articleId)
    tagIds.map(t => Mappers.ArticleTag.create(articleId, t).recoverWith(loggedFailure())).collect { case Success(tag) => tag }
    articleId
  }

}
