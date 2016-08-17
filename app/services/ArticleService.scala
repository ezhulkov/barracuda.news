package services

import javax.inject.{Inject, Singleton}
import com.google.inject.ImplementedBy
import models.CoreModels.{Article, Tag}
import scala.util.{Success, Try}

/**
  * Created by ezhulkov on 17.08.16.
  */
@ImplementedBy(classOf[ArticleServiceImpl])
trait ArticleService {

  def allArticles: Set[Article]
  def allTagged(tag: String): Set[Article]
  def findArticle(id: Long): Option[Article]
  def findArticle(url: String): Option[Article]
  def deleteArticle(id: Long)
  def saveArticle(article: Article): Try[Long]
  def allTags: Set[Tag]
  def allRootTags: Set[Tag]
  def search(q: String): Set[Article]

}

@Singleton
class ArticleServiceImpl @Inject()(

) extends ArticleService {

  override def allTags: Set[Tag] = Mappers.Tag.findAll().toSet
  override def allArticles: Set[Article] = Mappers.Article.joins(Mappers.Article.tagsRef).findAll().toSet
  override def findArticle(id: Long): Option[Article] = Mappers.Article.joins(Mappers.Article.tagsRef, Mappers.Article.transRef).findById(id)
  override def findArticle(url: String): Option[Article] = Mappers.Article.findByUrl(url)
  override def deleteArticle(id: Long): Unit = Mappers.Article.deleteById(id)
  override def saveArticle(article: Article): Try[Long] = Success(1)
  override def allTagged(tag: String): Set[Article] = ???
  override def search(q: String): Set[Article] = ???
  override def allRootTags: Set[Tag] = Mappers.Tag.findAllRoot()

}
