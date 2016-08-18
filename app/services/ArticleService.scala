package services

import javax.inject.Singleton
import com.google.inject.ImplementedBy
import models.CoreModels.Language.Language
import models.CoreModels.{Article, Language, Tag}
import play.api.Logger
import scalikejdbc.{DB, DBSession}
import scala.util.{Failure, Success, Try}

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
  override def findArticle(id: Long): Option[Article] = Mappers.Article.findById(id)
  override def deleteArticle(id: Long): Unit = Mappers.Article.deleteById(id)
  override def allRootTags: Set[Tag] = Mappers.Tag.findAllRoot()
  override def allTags(text: Set[String]): Set[Tag] = Mappers.Tag.allTags(text.toSeq)
  override def saveArticle(article: Article): Try[Long] = DB.autoCommit { implicit session =>
    trySaveArticle(article).map { articleId =>
      saveTags(article, articleId)
      saveTranslations(article, articleId)
      articleId
    }
  }
  override def allTagged(tag: String): Seq[Article] = Mappers.Article.findAllTagged(tag: String)
  override def search(q: String): Seq[Article] = Nil
  override def findArticle(url: String, lang: Language = Language.DEFAULT): Option[Article] = Mappers.Article.findByUrl(url)

  private def trySaveArticle(article: Article)(implicit s: DBSession): Try[Long] = {
    article.id match {
      case Some(id) =>
        Mappers.Article.update(article)
        Success(id)
      case None => Mappers.Article.create(article)
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
    val tagIds = (existingTags.flatMap(t => t.id) ++ createdTags).toSet
    Mappers.ArticleTag.deleteForArticle(articleId)
    tagIds.map(t => Mappers.ArticleTag.create(articleId, t).recoverWith(loggedFailure())).collect { case Success(tag) => tag }
  }
  private def loggedFailure[T](msg: String = ""): PartialFunction[Throwable, Try[T]] = {
    case th: Throwable =>
      Logger.error(msg, th)
      Failure(th)
  }

}
