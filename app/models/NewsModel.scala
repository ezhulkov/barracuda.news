package models

import com.github.nscala_time.time.Imports._
import models.NewsModel.BlockSize.BlockSize
import models.NewsModel.NewsType.NewsType
import models.NewsModel.RowHeight.RowHeight
import scala.language.implicitConversions

/**
  * Created by ezhulkov on 04.07.16.
  */
object NewsModel {

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

  sealed case class Layout(rows: Seq[NewsRow])
  sealed case class NewsRow(height: RowHeight, blocks: Seq[NewsBlock])
  sealed case class NewsBlock(tag: String, size: BlockSize, featured: Option[Boolean] = None, caption: Option[String] = None, newsType: NewsType = NewsType.TEXT)
  sealed case class NewsMedia(source: String, text: Option[String])
  sealed case class PeaceOfNews(caption: Option[String] = None, text: String, dateMillis: Long, tags: Iterable[String], media: Option[Seq[NewsMedia]]) {
    def searchMatch(q: String) = {
      val lCQ = q.toLowerCase
      text.toLowerCase.contains(lCQ) || caption.getOrElse("").contains(lCQ)
    }
    def date = DateTime.now()
    def dateFormatted = date.toString("yyyy/MM/dd HH:mm:SS")
    def firstSource = media.flatMap(m => m.headOption).map(t => t.source).orNull
    def backgroundImage(newsType: NewsType) = newsType match {
      case NewsType.PHOTO => s"background-image: url('$firstSource')"
      case NewsType.VIDEO => s"background-image: url('http://img.youtube.com/vi/$firstSource/0.jpg')"
      case _ => ""
    }
  }

}