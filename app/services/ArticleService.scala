package services

import javax.inject.{Inject, Singleton}
import com.google.inject.ImplementedBy
import models.CoreModels.Language.Language
import models.CoreModels.{Article, Language, Tag}
import play.api.Logger
import scala.util.{Failure, Success, Try}

/**
  * Created by ezhulkov on 17.08.16.
  */
@ImplementedBy(classOf[ArticleServiceImpl])
trait ArticleService {

  def allArticles: Set[Article]
  def allTagged(tag: String): Set[Article]
  def findArticle(id: Long): Option[Article]
  def findArticle(url: String, lang: Language = Language.DEFAULT): Option[Article]
  def deleteArticle(id: Long)
  def saveArticle(article: Article): Try[Long]
  def allTags: Set[Tag]
  def allTags(text: Set[String]): Set[Tag]
  def allRootTags: Set[Tag]
  def search(q: String): Set[Article]

}

@Singleton
class ArticleServiceImpl @Inject()(

) extends ArticleService {

  override def allTags: Set[Tag] = Mappers.Tag.findAll().toSet
  override def allArticles: Set[Article] = Mappers.Article.joins(Mappers.Article.tagsRef, Mappers.Article.transRef).findAll().toSet
  override def findArticle(id: Long): Option[Article] = Mappers.Article.joins(Mappers.Article.tagsRef, Mappers.Article.transRef).findById(id)
  override def deleteArticle(id: Long): Unit = Mappers.Article.deleteById(id)
  override def allRootTags: Set[Tag] = Mappers.Tag.findAllRoot()
  override def allTags(text: Set[String]): Set[Tag] = Mappers.Tag.allTags(text.toSeq)

  override def saveArticle(article: Article): Try[Long] = {
    for {
      articleId <- trySaveArticle(article)
      tags <- saveTags(article, articleId)
    } yield articleId
  }
  override def allTagged(tag: String): Set[Article] = ???
  override def search(q: String): Set[Article] = ???
  override def findArticle(url: String, lang: Language = Language.DEFAULT): Option[Article] = ???

  private def trySaveArticle(article: Article): Try[Long] = {
    article.id match {
      case Some(id) => Mappers.Article.update(article)
      case None => Mappers.Article.create(article)
    }
  }
  private def saveTags(article: Article, articleId: Long): Try[Set[Any]] = {
    val existingTags = Mappers.Tag.allTags(article.tags.map(t => t.text))
    val newTags = article.tags.filterNot(t => existingTags.exists(m => m.text == t.text))
    val createdTags = newTags.map(t => Mappers.Tag.create(t.text))
      .map(t => t.recoverWith(loggedFailure()))
      .collect { case Success(tag) => tag }
    val tagIds = (existingTags.flatMap(t => t.id) ++ createdTags).toSet
    Mappers.ArticleTag.deleteForArticle(articleId)
    val newLinks = tagIds.map(t => Mappers.ArticleTag.create(articleId, t).recoverWith(loggedFailure())).collect { case Success(tag) => tag }
    Success(newLinks)
  }
  private def loggedFailure[T](msg: String = ""): PartialFunction[Throwable, Try[T]] = {
    case th: Throwable =>
      Logger.error(msg, th)
      Failure(th)
  }

}
