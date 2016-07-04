package models

import models.NewsLayout.RowHeight
import models.NewsLayout._
import models.NewsLayout.BlockSize.BlockSize
import models.NewsLayout.RowHeight._
import play.api.libs.json._

/**
  * Created by ezhulkov on 04.07.16.
  */
object Implicits {

  object JsonImplicits {
    implicit val sizeEnumFormat   = new Format[BlockSize] {
      def reads(json: JsValue) = JsSuccess(BlockSize.withName(json.as[String]))
      def writes(ob: BlockSize) = JsString(ob.toString)
    }
    implicit val heightEnumFormat = new Format[RowHeight] {
      def reads(json: JsValue) = JsSuccess(RowHeight.withName(json.as[String]))
      def writes(ob: RowHeight) = JsString(ob.toString)
    }
    implicit val newsFormat       = Json.format[NewsBlock]
    implicit val rowFormat        = Json.format[NewsRow]
    implicit val layoutFormat     = Json.format[Layout]
  }

}
