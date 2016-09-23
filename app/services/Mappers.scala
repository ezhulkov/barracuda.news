package services

import models.CoreModels.Article
import models.CoreModels._
import org.joda.time.DateTime
import play.api.i18n.Lang
import scalikejdbc.DBSession
import scalikejdbc.WrappedResultSet
import scalikejdbc._
import scalikejdbc.autoConstruct
import skinny.orm.SkinnyCRUDMapper
import skinny.orm.SkinnyJoinTable
import scala.util.Try

/**
  * Created by ezhulkov on 17.08.16.
  */
object Mappers {

  implicit val langBinder: Binders[Lang] = Binders.string.xmap[Lang](t => Lang(t), t => t.code)

  object Tag extends SkinnyCRUDMapper[Tag] {

    override def connectionPoolName = 'default
    override lazy val defaultAlias = createAlias("t")
    override def extract(rs: WrappedResultSet, rn: ResultName[Tag]): Tag = autoConstruct(rs, rn)

    def findAllRoot()(implicit session: DBSession = autoSession): Set[Tag] = {
      where(sqls.eq(defaultAlias.root, true)).apply().toSet
    }

    def allTags(text: Seq[String])(implicit session: DBSession = autoSession): Set[Tag] = {
      where(sqls.in(defaultAlias.text, text)).apply().toSet
    }

    def create(text: String): Try[Long] = Try(createWithNamedValues(column.text -> text, column.root -> false))

  }

  object Layout extends SkinnyCRUDMapper[Layout] {

    override def connectionPoolName = 'default
    override lazy val defaultAlias = createAlias("l")
    override def extract(rs: WrappedResultSet, rn: ResultName[Layout]): Layout = autoConstruct(rs, rn, "tag")

    lazy val tagRef = belongsTo[Tag](
      right = Tag,
      merge = (a, t) => a.copy(tag = t))

    def findById(id: Long) = joins(tagRef).findById(id)
    def findByTag(tag: String) = joins(tagRef).findBy(sqls.eq(Tag.defaultAlias.text, tag))
    def findAll = joins(tagRef).findAll()
    def update(layout: Layout)(implicit s: DBSession): Try[Int] = Try(updateById(layout.id.get).withAttributes(
      'name -> layout.name.getOrElse("-"),
      'rawConfig -> layout.rawConfig.filter(_.nonEmpty).orNull,
      'tagId -> layout.tag.map(t => t.id).orNull
    ))
    def create(layout: Layout)(implicit s: DBSession): Try[Long] = Try(createWithAttributes(
      'name -> layout.name.getOrElse("-"),
      'rawConfig -> layout.rawConfig.filter(_.nonEmpty).orNull,
      'tagId -> layout.tag.map(t => t.id).orNull
    ))

  }

  object Article extends SkinnyCRUDMapper[Article] {

    override def connectionPoolName = 'default
    override lazy val defaultAlias = createAlias("a")
    override def extract(rs: WrappedResultSet, rn: ResultName[Article]): Article = autoConstruct(rs, rn, "tags", "translations", "crossLinks")

    lazy val ordering = Seq(sqls"${defaultAlias.publish} desc")
    lazy val tagsRef  = hasManyThrough[Tag](
      through = ArticleTag,
      many = Tag,
      merge = (a, t) => a.copy(tags = t))
    lazy val transRef = hasMany[Translation](
      many = Translation -> Translation.defaultAlias,
      on = (a, t) => sqls.eq(a.id, t.articleId),
      merge = (a, t) => a.copy(translations = t))

    def findAll(onlyPublished: Boolean): Seq[Article] = {
      val query = joins(tagsRef, transRef)
      val now = DateTime.now()
      if (onlyPublished) query.findAllBy(sqls.le(defaultAlias.publish, now), ordering)
      else query.findAll(ordering)
    }

    def findById(id: Long): Option[Article] = joins(tagsRef, transRef).findById(id)
    def findByUrl(url: String): Option[Article] = joins(tagsRef, transRef).findBy(sqls.eq(defaultAlias.url, url))
    def findAllTagged(tag: String): Seq[Article] = joins(tagsRef, transRef).findAllBy(sqls.eq(Tag.defaultAlias.text, tag), ordering)
    def findAllByIdsSeq(ids: Seq[Long]): Seq[Article] = joins(tagsRef, transRef).findAllByIds(ids: _*)
    def update(article: Article)(implicit s: DBSession): Try[Int] = Try(updateById(article.id.get).withAttributes(
      'url -> article.generateUrl,
      'origin -> article.origin.filter(_.nonEmpty).orNull,
      'publish -> article.publish
    ))
    def updateCover(article: Article)(implicit s: DBSession): Try[Int] = Try(updateById(article.id.get).withAttributes(
      'coverMedia -> article.coverMedia.filter(_.nonEmpty).orNull
    ))
    def create(article: Article)(implicit s: DBSession): Try[Long] = Try(createWithAttributes(
      'origin -> article.origin.filter(_.nonEmpty).orNull,
      'coverMedia -> article.coverMedia.filter(_.nonEmpty).orNull,
      'publish -> article.publish
    ))

  }

  object Translation extends SkinnyCRUDMapper[Translation] {

    override def connectionPoolName = 'default
    override lazy val defaultAlias = createAlias("tr")
    override def extract(rs: WrappedResultSet, rn: ResultName[Translation]): Translation = autoConstruct(rs, rn, "media")

    lazy val mediaRef = hasMany[NewsMedia](
      many = NewsMedia -> NewsMedia.defaultAlias,
      on = (t, m) => sqls.eq(t.id, m.translationId),
      merge = (t, m) => t.copy(media = m))

    def findByLang(articleId: Long, lang: Lang)(implicit session: DBSession): Option[Translation] =
      where(sqls.eq(defaultAlias.articleId, articleId) and sqls.eq(defaultAlias.lang, lang.code)).apply().headOption
    def create(articleId: Long, lang: Lang, translation: Translation)(implicit session: DBSession): Try[Long] = Try(Translation.createWithAttributes(
      'articleId -> articleId,
      'lang -> lang.code,
      'caption -> translation.caption.filter(_.nonEmpty).orNull,
      'text -> translation.text.filter(_.nonEmpty).orNull
    ))
    def update(translation: Translation, translationId: Long)(implicit session: DBSession): Try[Int] = Try(Translation.updateById(translationId).withAttributes(
      'caption -> translation.caption.filter(_.nonEmpty).orNull,
      'text -> translation.text.filter(_.nonEmpty).orNull
    ))

  }

  object NewsMedia extends SkinnyCRUDMapper[NewsMedia] {
    override def connectionPoolName = 'default
    override lazy val defaultAlias = createAlias("m")
    override def extract(rs: WrappedResultSet, rn: ResultName[NewsMedia]): NewsMedia = autoConstruct(rs, rn)
  }

  sealed case class CrossLinkArticle(articleId: Long, linkId: Long, linkArticle: Option[Article] = None)
  object CrossLinkArticle extends SkinnyJoinTable[CrossLinkArticle] {
    override def connectionPoolName = 'default
    override def defaultAlias = createAlias("aa")
    override def extract(rs: WrappedResultSet, rn: ResultName[CrossLinkArticle]): CrossLinkArticle = autoConstruct(rs, rn, "linkArticle")
    lazy val articleRef = belongsToWithFk[Article](
      right = Article,
      fk = "linkId",
      merge = (link, article) => link.copy(linkArticle = article)
    )
    def findByArticle(article: Article) = findAllBy(sqls.eq(defaultAlias.articleId, article.id.get))
    def findByArticleJoiningLinks(article: Article) = joins(articleRef).findAllBy(sqls.eq(defaultAlias.articleId, article.id.get))
    def create(articleId: Long, linkId: Long): Try[Any] = Try(CrossLinkArticle.createWithAttributes('articleId -> articleId, 'linkId -> linkId))
    def deleteForArticle(articleId: Long) = CrossLinkArticle.deleteBy(sqls.eq(ArticleTag.column.articleId, articleId))
  }

  sealed case class ArticleTag(articleId: Long, tagId: Long)
  object ArticleTag extends SkinnyJoinTable[ArticleTag] {
    override def connectionPoolName = 'default
    override def defaultAlias = createAlias("at")
    def create(articleId: Long, tagId: Long): Try[Any] = Try(ArticleTag.createWithAttributes('articleId -> articleId, 'tagId -> tagId))
    def deleteForArticle(articleId: Long) = ArticleTag.deleteBy(sqls.eq(ArticleTag.column.articleId, articleId))
  }

}
