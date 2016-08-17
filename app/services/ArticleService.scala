package services

import javax.inject.{Inject, Singleton}
import com.google.inject.ImplementedBy
import models.CoreModels.Language.Language
import models.CoreModels.{Article, Language, Tag}
import scala.util.{Success, Try}

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
    val existingTags = allTags(article.tags.map(t => t.text).toSet)
    val newTags = article.tags.filterNot(t => existingTags.contains(t))
    Success(1)
  }
  override def allTagged(tag: String): Set[Article] = ???
  override def search(q: String): Set[Article] = ???
  override def findArticle(url: String, lang: Language = Language.DEFAULT): Option[Article] = ???

}
