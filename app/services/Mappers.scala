package services

import models.CoreModels.Language.Language
import models.CoreModels._
import org.joda.time.DateTime
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

  implicit val langBinder: Binders[Language] = Binders.string.xmap[Language](t => Language.withName(t), t => t.toString)

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

  object Article extends SkinnyCRUDMapper[Article] {

    override def connectionPoolName = 'default
    override lazy val defaultAlias = createAlias("a")
    override def extract(rs: WrappedResultSet, rn: ResultName[Article]): Article = autoConstruct(rs, rn, "tags", "translations", "crossLinks")

    lazy val ordering      = Seq(sqls"${defaultAlias.publish} desc")
    lazy val tagsRef       = hasManyThrough[Tag](
      through = ArticleTag,
      many = Tag,
      merge = (a, t) => a.copy(tags = t))
    lazy val crossLinksRef = hasManyThrough[Article](
      through = CrossLinkArticle,
      many = Article,
      merge = (a, t) => a.copy(crossLinks = t))
    lazy val transRef      = hasMany[Translation](
      many = Translation -> Translation.defaultAlias,
      on = (a, t) => sqls.eq(a.id, t.articleId),
      merge = (a, t) => a.copy(translations = t))

    def findAll(onlyPublished: Boolean): Seq[Article] = {
      val query = joins(tagsRef, transRef)
      val now = DateTime.now()
      if (onlyPublished) query.findAllBy(sqls.le(defaultAlias.publish, now), ordering)
      else query.findAll(ordering)
    }

    def findById(id: Long): Option[Article] = joins(tagsRef, transRef, crossLinksRef).findById(id)
    def findByUrl(url: String): Option[Article] = joins(tagsRef, transRef, crossLinksRef).findBy(sqls.eq(defaultAlias.url, url))
    def findAllTagged(tag: String): Seq[Article] = joins(tagsRef, transRef).findAllBy(sqls.eq(Tag.defaultAlias.text, tag), ordering)
    def findAllByIdsSeq(ids: Seq[Long]): Seq[Article] = joins(tagsRef, transRef).findAllByIds(ids: _*)
    def update(article: Article)(implicit s: DBSession): Try[Int] = Try(updateById(article.id.get).withAttributes(
      'url -> article.generateUrl,
      'origin -> article.origin.orNull,
      'coverMedia -> article.coverMedia.orNull,
      'publish -> article.publish
    ))
    def create(article: Article)(implicit s: DBSession): Try[Long] = Try(createWithAttributes(
      'origin -> article.origin.orNull,
      'coverMedia -> article.coverMedia.orNull,
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

    def findByLang(articleId: Long, lang: Language)(implicit session: DBSession): Option[Translation] =
      where(sqls.eq(defaultAlias.articleId, articleId) and sqls.eq(defaultAlias.lang, lang)).apply().headOption
    def create(articleId: Long, lang: Language, translation: Translation)(implicit session: DBSession): Try[Long] = Try(Translation.createWithAttributes(
      'articleId -> articleId,
      'lang -> lang.toString,
      'caption -> translation.caption,
      'text -> translation.text
    ))
    def update(translation: Translation, translationId: Long)(implicit session: DBSession): Try[Int] = Try(Translation.updateById(translationId).withAttributes(
      'caption -> translation.caption,
      'text -> translation.text
    ))

  }

  object NewsMedia extends SkinnyCRUDMapper[NewsMedia] {
    override def connectionPoolName = 'default
    override lazy val defaultAlias = createAlias("m")
    override def extract(rs: WrappedResultSet, rn: ResultName[NewsMedia]): NewsMedia = autoConstruct(rs, rn)
  }

  sealed case class CrossLinkArticle(articleId: Long, linkId: Long)
  object CrossLinkArticle extends SkinnyJoinTable[CrossLinkArticle] {
    override def connectionPoolName = 'default
    override def defaultAlias = createAlias("aa")
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
