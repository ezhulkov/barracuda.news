package models

import com.github.nscala_time.time.Imports._
import models.NewsLayout.BlockSize.BlockSize
import models.NewsLayout.RowHeight.RowHeight
import scala.language.implicitConversions


/**
  * Created by ezhulkov on 04.07.16.
  */
object NewsLayout {

  object BlockSize extends Enumeration {
    type BlockSize = Value
    val SIZE4  = BlockSizeValue("SIZE4", 4)
    val SIZE6  = BlockSizeValue("SIZE6", 6)
    val SIZE8  = BlockSizeValue("SIZE8", 8)
    val SIZE12 = BlockSizeValue("SIZE12", 12)
    sealed case class BlockSizeValue(code: String, size: Int) extends super.Val(code)
    implicit def convert(value: Value): BlockSizeValue = value.asInstanceOf[BlockSizeValue]
  }

  object RowHeight extends Enumeration {
    type RowHeight = Value
    val HEIGHT1 = RowHeightValue("SIZE1", 1)
    val HEIGHT2 = RowHeightValue("SIZE2", 2)
    val HEIGHT3 = RowHeightValue("SIZE3", 3)
    val HEIGHT4 = RowHeightValue("SIZE4", 4)
    sealed case class RowHeightValue(code: String, height: Int) extends super.Val(code)
    implicit def convert(value: Value): RowHeightValue = value.asInstanceOf[RowHeightValue]
  }

  sealed case class Layout(rows: Seq[NewsRow])

  sealed case class NewsBlock(tag: String, size: BlockSize, featured: Boolean = false)

  sealed case class NewsRow(height: RowHeight, blocks: Seq[NewsBlock])

  sealed case class PeaceOfNews(caption: Option[String], text: Option[String], date: Option[DateTime], tags: Iterable[String])

}