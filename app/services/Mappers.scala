package services

import models.CoreModels.Language.Language
import models.CoreModels._
import scalikejdbc.{DBSession, WrappedResultSet, autoConstruct, _}
import skinny.orm.{SkinnyCRUDMapper, SkinnyJoinTable}
import scala.util.Try

/**
  * Created by ezhulkov on 17.08.16.
  */
object Mappers {

  implicit val langBinder: Binders[Language] = Binders.string.xmap[Language](t => Language.withName(t), t => t.toString)

  object Tag extends SkinnyCRUDMapper[Tag] {

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

    override lazy val defaultAlias = createAlias("a")
    override def extract(rs: WrappedResultSet, rn: ResultName[Article]): Article = autoConstruct(rs, rn, "tags", "translations")

    lazy val tagsRef  = hasManyThrough[Tag](
      through = ArticleTag,
      many = Tag,
      merge = (a, t) => a.copy(tags = t))
    lazy val transRef = hasMany[Translation](
      many = Translation -> Translation.defaultAlias,
      on = (a, t) => sqls.eq(a.id, t.articleId),
      merge = (a, t) => a.copy(translations = t))

    def updateAttributes(article: Article) = Seq(
      'url -> article.url.orNull,
      'origin -> article.origin.orNull,
      'publish -> article.publish
    )
    def findByUrl(url: String)(implicit session: DBSession): Option[Article] = where(sqls.eq(defaultAlias.url, url)).apply().headOption
    def update(article: Article)(implicit s: DBSession): Try[Long] = Try(updateById(article.id.get).withAttributes(updateAttributes(article): _*))
    def create(article: Article)(implicit s: DBSession): Try[Long] = Try(createWithAttributes(updateAttributes(article): _*))

  }

  object Translation extends SkinnyCRUDMapper[Translation] {

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
    def save(translation: Translation, translationId: Long)(implicit session: DBSession): Try[Long] = Try(Translation.updateById(translationId).withAttributes(
      'caption -> translation.caption,
      'text -> translation.text
    ))

  }

  object NewsMedia extends SkinnyCRUDMapper[NewsMedia] {

    override lazy val defaultAlias = createAlias("m")
    override def extract(rs: WrappedResultSet, rn: ResultName[NewsMedia]): NewsMedia = autoConstruct(rs, rn)

  }

  sealed case class ArticleTag(articleId: Long, tagId: Long)
  object ArticleTag extends SkinnyJoinTable[ArticleTag] {
    override def defaultAlias = createAlias("at")
    def create(articleId: Long, tagId: Long): Try[Any] = Try(ArticleTag.createWithAttributes('articleId -> articleId, 'tagId -> tagId))
    def deleteForArticle(articleId: Long) = ArticleTag.deleteBy(sqls.eq(ArticleTag.column.articleId, articleId))
  }

}
