package services

import javax.inject.Singleton
import com.google.inject.ImplementedBy
import models.CoreModels.Article
import models.CoreModels.Language
import models.CoreModels.Language.Language
import models.CoreModels.Tag
import play.api.Logger
import scalikejdbc.DB
import scalikejdbc.DBSession
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

}

@Singleton
class ArticleServiceImpl extends ArticleService {

  override def allTags: Set[Tag] = Mappers.Tag.findAll().toSet
  override def allArticles(onlyPublished: Boolean = true): Seq[Article] = Mappers.Article.findAll(onlyPublished)
  override def findArticle(id: Long): Option[Article] = Mappers.Article.findById(id).map(joinCrossLinks)
  override def deleteArticle(id: Long): Unit = Mappers.Article.deleteById(id)
  override def allRootTags: Set[Tag] = Mappers.Tag.findAllRoot()
  override def allTags(text: Set[String]): Set[Tag] = Mappers.Tag.allTags(text.toSeq)
  override def saveArticle(article: Article): Try[Long] = DB.autoCommit { implicit session =>
    trySaveArticle(article).map { articleId =>
      saveCrossLinks(article, articleId)
      saveTags(article, articleId)
      saveTranslations(article, articleId)
      articleId
    }
  }
  override def allTagged(tag: String): Seq[Article] = {
    val tagged = Mappers.Article.findAllTagged(tag: String)
    Mappers.Article.findAllByIdsSeq(tagged.map(t => t.id.getOrElse(0L))).sortBy(t => -t.publish.getMillis)
  }
  override def search(q: String): Seq[Article] = Nil
  override def findArticle(url: String, lang: Language = Language.DEFAULT): Option[Article] = Mappers.Article.findByUrl(url).map(joinCrossLinks)

  private def joinCrossLinks(article: Article) = {
    val links = Mappers.CrossLinkArticle.findByArticle(article)
    val articles = Mappers.Article.findAllByIdsSeq(links.map(t => t.linkId))
    article.withCrossLinks(articles)
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
  private def saveCrossLinks(article: Article, articleId: Long)(implicit s: DBSession) = {
    Mappers.CrossLinkArticle.deleteForArticle(articleId)
    article.crossLinks.getOrElse(Nil).filter(t => t != 0).map { link =>
      Mappers.CrossLinkArticle.create(articleId, link).recoverWith(loggedFailure())
    }
  }
  private def saveTranslations(article: Article, articleId: Long)(implicit s: DBSession) = {
    article.translations.map { translation =>
      Mappers.Translation.findByLang(articleId, translation.lang) match {
        case Some(a) => Mappers.Translation.update(translation, a.id.get)
        case None => Mappers.Translation.create(articleId, translation.lang, translation)
      }
    }
  }
  private def saveTags(article: Article, articleId: Long)(implicit s: DBSession) = {
    val existingTags = Mappers.Tag.allTags(article.tags.map(t => t.text))
    val newTags = article.tags.filterNot(t => existingTags.exists(m => m.text == t.text))
    val createdTags = newTags.map(t => Mappers.Tag.create(t.text))
      .map(t => t.recoverWith(loggedFailure()))
      .collect { case Success(tag) => tag }
    val tagIds = existingTags.flatMap(t => t.id) ++ createdTags
    Mappers.ArticleTag.deleteForArticle(articleId)
    tagIds.map(t => Mappers.ArticleTag.create(articleId, t).recoverWith(loggedFailure())).collect { case Success(tag) => tag }
  }
  private def loggedFailure[T](msg: String = ""): PartialFunction[Throwable, Try[T]] = {
    case th: Throwable =>
      Logger.error(msg, th)
      Failure(th)
  }

}
