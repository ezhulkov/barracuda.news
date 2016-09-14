package services

import java.io.ByteArrayInputStream
import java.io.File
import java.util.Base64
import java.util.concurrent.atomic.AtomicInteger
import java.util.regex.Pattern
import javax.imageio.ImageIO
import javax.inject.Singleton
import com.google.inject.ImplementedBy
import models.CoreModels.Article
import models.CoreModels.Language
import models.CoreModels.Language.Language
import models.CoreModels.Tag
import models.CoreModels.Translation
import net.coobird.thumbnailator.Thumbnails
import org.apache.commons.io.FileUtils
import play.api.Logger
import scalikejdbc.DB
import scalikejdbc.DBSession
import utils.Configuration
import scala.util.Failure
import scala.util.Success
import scala.util.Try

/**
  * Created by ezhulkov on 17.08.16.
  */
@ImplementedBy(classOf[ArticleServiceImpl])
trait ArticleService {

  def allArticles(onlyPublished: Boolean = true): Seq[Article]
  def allTagged(tag: String): Seq[Article]
  def findArticle(id: Long): Option[Article]
  def findArticle(url: String, lang: Language = Language.DEFAULT): Option[Article]
  def deleteArticle(id: Long)
  def saveArticle(article: Article): Try[Long]
  def allTags: Set[Tag]
  def allTags(text: Set[String]): Set[Tag]
  def allRootTags: Set[Tag]
  def search(q: String): Seq[Article]
  def extractImages(translation: Translation): Try[Translation]

}

@Singleton
class ArticleServiceImpl extends ArticleService {

  private lazy val imgPattern        = Pattern.compile("""<img\s*src=("data.*?base64,.*?")""")
  private lazy val b64Pattern        = Pattern.compile("""".*?base64,(.*)"""")
  private      val imageFolder       = Configuration.getValue("image.folder").getOrElse("/tmp")
  private      val imageUrl          = Configuration.getValue("image.url").getOrElse("/media")
  private      val articleImageWidth = Configuration.getValue("iamge.width").getOrElse(1040)

  override def allTags: Set[Tag] = Mappers.Tag.findAll().toSet
  override def allArticles(onlyPublished: Boolean = true): Seq[Article] = Mappers.Article.findAll(onlyPublished)
  override def findArticle(id: Long): Option[Article] = Mappers.Article.findById(id).map(joinCrossLinks)
  override def deleteArticle(id: Long): Unit = Mappers.Article.deleteById(id)
  override def allRootTags: Set[Tag] = Mappers.Tag.findAllRoot()
  override def allTags(text: Set[String]): Set[Tag] = Mappers.Tag.allTags(text.toSeq)
  override def saveArticle(article: Article): Try[Long] = DB.autoCommit { implicit session =>
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
  override def search(q: String): Seq[Article] = Nil
  override def findArticle(url: String, lang: Language = Language.DEFAULT): Option[Article] = Mappers.Article.findByUrl(url).map(joinCrossLinks)
  override def extractImages(translation: Translation): Try[Translation] = Try {
    val imgMatcher = imgPattern.matcher(translation.text)
    val out = new StringBuffer()
    val counter = new AtomicInteger(0)
    while (imgMatcher.find()) {
      if (imgMatcher.groupCount() == 1) {
        val data = imgMatcher.group(1)
        val b64Matcher = b64Pattern.matcher(data)
        if (b64Matcher.find()) {
          val base64Data = b64Matcher.group(1)
          val fileName = decodeAndStore(translation.caption, counter.incrementAndGet(), base64Data)
          imgMatcher.appendReplacement(out, s"""<img class="article-image" src="$imageUrl/$fileName" title="${translation.caption}" alt="${translation.caption}"""")
        }
      }
    }
    val extractedText = imgMatcher.appendTail(out).toString
    translation.copy(text = extractedText)
  }
  private def decodeAndStore(caption: String, number: Int, base64Data: String): String = {
    val bytes = Base64.getDecoder.decode(base64Data)
    val image = ImageIO.read(new ByteArrayInputStream(bytes))
    val resized = image.getWidth > articleImageWidth match {
      case true => Thumbnails.of(image).width(articleImageWidth).keepAspectRatio(true).asBufferedImage
      case false => image
    }
    val fileName = s"${Utils.transliterate(caption)}-$number.jpg"
    val file = new File(s"$imageFolder/$fileName")
    ImageIO.write(resized, "jpg", file)
    fileName
  }
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
        Mappers.Article.update(article)
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
    val existingTags = Mappers.Tag.allTags(article.tags.map(t => t.text))
    val newTags = article.tags.filterNot(t => existingTags.exists(m => m.text == t.text))
    val createdTags = newTags.map(t => Mappers.Tag.create(t.text))
      .map(t => t.recoverWith(loggedFailure()))
      .collect { case Success(tag) => tag }
    val tagIds = existingTags.flatMap(t => t.id) ++ createdTags
    Mappers.ArticleTag.deleteForArticle(articleId)
    tagIds.map(t => Mappers.ArticleTag.create(articleId, t).recoverWith(loggedFailure())).collect { case Success(tag) => tag }
    articleId
  }
  private def loggedFailure[T](msg: String = ""): PartialFunction[Throwable, Try[T]] = {
    case th: Throwable =>
      Logger.error(msg, th)
      Failure(th)
  }

}
