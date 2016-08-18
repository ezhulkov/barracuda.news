package models

import com.github.nscala_time.time.Imports._
import models.CoreModels.BlockSize.BlockSize
import models.CoreModels.Language.Language
import models.CoreModels.NewsType.NewsType
import models.CoreModels.RowHeight.RowHeight
import org.apache.commons.lang3.StringUtils
import services.Utils
import scala.language.implicitConversions

/**
  * Created by ezhulkov on 04.07.16.
  */
object CoreModels {

  val dateFormat = "yyyy/MM/dd HH:mm:SS"

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
    val HEIGHT1 = RowHeightValue("HEIGHT1", 1, "height1", 2)
    val HEIGHT2 = RowHeightValue("HEIGHT2", 2, "height2", 4)
    val HEIGHT3 = RowHeightValue("HEIGHT3", 3, "height3", 6)
    val HEIGHT4 = RowHeightValue("HEIGHT4", 4, "height4", 8)
    sealed case class RowHeightValue(code: String, height: Int, cssClass: String, maxNews: Int) extends super.Val(code)
    implicit def convert(value: Value): RowHeightValue = value.asInstanceOf[RowHeightValue]
  }

  object NewsType extends Enumeration {
    type NewsType = Value
    val TEXT  = NewsTypeValue("TEXT", "text")
    val PHOTO = NewsTypeValue("PHOTO", "photo")
    val VIDEO = NewsTypeValue("VIDEO", "video")
    sealed case class NewsTypeValue(code: String, cssClass: String) extends super.Val(code)
    implicit def convert(value: Value): NewsTypeValue = value.asInstanceOf[NewsTypeValue]
  }

  object Language extends Enumeration {
    type Language = Value
    val ENGLISH = LanguageValue("en", "English", "Рус")
    val RUSSIAN = LanguageValue("ru", "Русский", "Eng")
    val DEFAULT = ENGLISH
    sealed case class LanguageValue(code: String, name: String, label: String) extends super.Val(code)
    implicit def convert(value: Value): LanguageValue = value.asInstanceOf[LanguageValue]
  }

  sealed case class Tag(id: Option[Long], text: String, root: Option[Boolean] = None)
  sealed case class Layout(rows: Seq[NewsRow])
  sealed case class NewsRow(height: RowHeight, blocks: Seq[NewsBlock])
  sealed case class NewsBlock(tag: String, size: BlockSize, featured: Option[Boolean] = None, caption: Option[String] = None, newsType: NewsType = NewsType.TEXT)
  sealed case class NewsMedia(id: Long, translationId: Long, url: String, text: Option[String])
  case class Article(
    id: Option[Long],
    url: Option[String],
    origin: Option[String],
    coverMedia: Option[String],
    publish: DateTime,
    tags: Seq[Tag] = Nil,
    translations: Seq[Translation] = Nil
  ) {
    val publishFormatted      = publish.toString("YYYY/MM/D HH:mm")
    val publishShortFormatted = publish.toString("YYYY-MM-D-")
    def generateUrl = publishShortFormatted + translations.find(t => t.lang == Language.DEFAULT && StringUtils.isNotEmpty(t.caption)).map(t => Utils.transliterate(t.caption)).getOrElse(id.toString)
    def hasTag(tag: String): Boolean = tags.exists(_.text == tag)
    def backgroundStyle(newsType: NewsType) = coverMedia.flatMap(cover => newsType match {
      case NewsType.PHOTO => Some(s"""style="background-image: url('$cover')"""")
      case NewsType.VIDEO => Some(s"""style="background-image: url('http://img.youtube.com/vi/$cover/0.jpg')"""")
      case _ => None
    })
  }
  sealed case class Translation(id: Option[Long], articleId: Option[Long], lang: Language, caption: String, text: String, media: Seq[NewsMedia] = Nil) {
    def searchMatch(q: String) = {
      val lCQ = q.toLowerCase
      text.toLowerCase.contains(lCQ) || caption.contains(lCQ)
    }
  }

  object Translation {
    def newTranslations = Language.values.map(l => Translation(None, None, l, s"Article caption [${l.name}]", s"Article body [${l.name}}]", Nil)).toSeq
  }

  object Article {
    def newArticle = Article(None, None, None, None, DateTime.now(), Nil, Translation.newTranslations)
  }

}