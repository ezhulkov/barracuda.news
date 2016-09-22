package models

import java.net.URL
import java.util.UUID
import com.github.nscala_time.time.Imports._
import models.CoreModels.BlockSize.BlockSize
import models.CoreModels.NewsType.NewsType
import models.CoreModels.RowHeight.RowHeight
import play.api.i18n.Lang
import play.api.libs.json.Json
import services.LangUtils
import services.Utils
import scala.language.implicitConversions
import scala.util.Try

/**
  * Created by ezhulkov on 04.07.16.
  */
object CoreModels {

  import Implicits._

  val dateFormat      = "YYYY/MM/dd HH:mm"
  val dateFormatShort = "YYYY/MM/dd"
  val trackingBaseUrl = "http://sport2.interprocom.ru"

  object BlockSize extends Enumeration {
    type BlockSize = Value
    val SIZE4  = BlockSizeValue("SIZE4", 4, "span4")
    val SIZE6  = BlockSizeValue("SIZE6", 6, "span6")
    val SIZE8  = BlockSizeValue("SIZE8", 8, "span8")
    val SIZE12 = BlockSizeValue("SIZE12", 12, "span12")
    sealed case class BlockSizeValue(code: String, size: Int, cssClass: String) extends super.Val(code)
    implicit def convert(value: Value): BlockSizeValue = value.asInstanceOf[BlockSizeValue]
  }

  object RowHeight extends Enumeration {
    type RowHeight = Value
    val HEIGHT1 = RowHeightValue("HEIGHT1", 1, "height1", 3)
    val HEIGHT2 = RowHeightValue("HEIGHT2", 2, "height2", 6)
    val HEIGHT3 = RowHeightValue("HEIGHT3", 3, "height3", 9)
    val HEIGHT4 = RowHeightValue("HEIGHT4", 4, "height4", 11)
    sealed case class RowHeightValue(code: String, height: Int, cssClass: String, maxNews: Int) extends super.Val(code)
    implicit def convert(value: Value): RowHeightValue = value.asInstanceOf[RowHeightValue]
  }

  object NewsType extends Enumeration {
    type NewsType = Value
    val TEXT        = NewsTypeValue("TEXT", "text")
    val PHOTO       = NewsTypeValue("PHOTO", "photo")
    val COVER_PHOTO = NewsTypeValue("COVER_PHOTO", "cover-photo")
    val VIDEO       = NewsTypeValue("VIDEO", "video")
    sealed case class NewsTypeValue(code: String, cssClass: String) extends super.Val(code)
    implicit def convert(value: Value): NewsTypeValue = value.asInstanceOf[NewsTypeValue]
  }

  case class Tag(id: Option[Long], text: String, root: Option[Boolean] = None)
  object Layout {
    def newLayout = Layout(None, None, None, None)
  }
  case class Layout(id: Option[Long], name: Option[String], rawConfig: Option[String], tag: Option[Tag] = None) {
    def config: Option[LayoutConfig] = rawConfig.map(c => Json.parse(c).as[LayoutConfig])
  }
  case class LayoutConfig(rows: Seq[NewsRow])
  case class NewsRow(height: RowHeight, blocks: Seq[NewsBlock])
  case class BlockCaption(lang: Lang, text: String)
  case class NewsBlock(tag: String, size: BlockSize, featured: Option[Boolean] = None, captions: Option[Seq[BlockCaption]] = None, newsType: NewsType = NewsType.TEXT) {
    def localCaption(implicit lang: Lang) = captions.getOrElse(Nil).find(t => t.lang == lang)
  }
  case class NewsMedia(id: Long, translationId: Long, url: String, text: Option[String])
  object Article {
    def newArticle = Article(None, None, None, None, DateTime.now(), Nil, Translation.newTranslations)
  }
  case class Article(
    id: Option[Long],
    url: Option[String],
    origin: Option[String],
    coverMedia: Option[String],
    publish: DateTime,
    tags: Seq[Tag] = Nil,
    translations: Seq[Translation] = Nil,
    crossLinks: Option[Seq[Long]] = None
  ) {
    val publishFormatted            = publish.toString(dateFormat)
    val publishShortFormatted       = publish.toString("YYYY-MM-dd-")
    var crossArticles: Seq[Article] = Nil
    def transliteratedUrl = translation(LangUtils.defaultLang).flatMap(t => t.caption).map(t => Utils.transliterate(t)).getOrElse(id.toString)
    def generateUrl = s"$publishShortFormatted-$transliteratedUrl-${id.orNull}"
    def hasTag(tag: String): Boolean = tags.exists(_.text == tag)
    def translation(implicit lang: Lang) = translations.find(t => t.lang == lang)
    def translationOrDefault(implicit lang: Lang) = translation(lang).orElse(translation(LangUtils.defaultLang)).getOrElse(translations.find(t => t.caption.isDefined).get)
    def originDomain = origin.flatMap(t => Try(new URL(t)).toOption).map(t => t.getHost).orElse(origin)
    def withCrossLinks(links: Seq[Article]) = {
      val c = copy(crossLinks = Some(links.flatMap(t => t.id)))
      c.crossArticles = links
      c
    }
  }
  object Translation {
    def newTranslations = LangUtils.langs.map(l => Translation(None, None, l, None, None, Nil)).toSeq
  }
  case class Translation(id: Option[Long], articleId: Option[Long], lang: Lang, caption: Option[String], text: Option[String], media: Seq[NewsMedia] = Nil) {
    def searchMatch(q: String) = (text ++ caption).mkString(" ").toLowerCase.contains(q.toLowerCase)
  }
  case class TrackingEvent(id: Option[UUID], name: Option[String], eventStart: Option[DateTime], eventEnd: Option[DateTime], imageUrl: Option[String], races: Option[Seq[TrackingRace]]) {
    val interval       = new org.joda.time.Interval(eventStart.getOrElse(DateTime.now()), eventEnd.getOrElse(DateTime.now()))
    val startTrimmed   = eventStart.map(t => t.withTimeAtStartOfDay)
    val endTrimmed     = eventEnd.map(t => t.withTimeAtStartOfDay)
    val startFormatted = startTrimmed.map(t => t.toString(dateFormatShort)).getOrElse("")
    val endFormatted   = endTrimmed.map(t => t.toString(dateFormatShort)).getOrElse("")
    def isActive = interval.containsNow()
  }
  case class TrackingRace(id: Option[UUID], name: Option[String], start: Option[DateTime], end: Option[DateTime], localUrl: Option[String]) {
    val interval       = new org.joda.time.Interval(start.getOrElse(DateTime.now()), end.getOrElse(DateTime.now()))
    val startTrimmed   = start.map(t => t.withTimeAtStartOfDay)
    val endTrimmed     = end.map(t => t.withTimeAtStartOfDay)
    val startFormatted = startTrimmed.map(t => t.toString(dateFormatShort)).getOrElse("")
    val endFormatted   = endTrimmed.map(t => t.toString(dateFormatShort)).getOrElse("")
    def isActive = interval.containsNow()
  }

}