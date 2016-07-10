package models

import models.NewsModel.BlockSize.BlockSize
import models.NewsModel.NewsType.NewsType
import models.NewsModel.RowHeight._
import models.NewsModel.{RowHeight, _}
import play.api.libs.json._

/**
  * Created by ezhulkov on 04.07.16.
  */
object Implicits {

  object JsonImplicits {
    implicit val sizeEnumFormat     = new Format[BlockSize] {
      def reads(json: JsValue) = JsSuccess(BlockSize.withName(json.as[String]))
      def writes(ob: BlockSize) = JsString(ob.toString)
    }
    implicit val heightEnumFormat   = new Format[RowHeight] {
      def reads(json: JsValue) = JsSuccess(RowHeight.withName(json.as[String]))
      def writes(ob: RowHeight) = JsString(ob.toString)
    }
    implicit val newsTypeEnumFormat = new Format[NewsType] {
      def reads(json: JsValue) = JsSuccess(NewsType.withName(json.as[String]))
      def writes(ob: NewsType) = JsString(ob.toString)
    }
    implicit val mediaFormat        = Json.format[NewsMedia]
    implicit val peaceOfNewsFormat  = Json.format[PeaceOfNews]
    implicit val newsFormat         = Json.format[NewsBlock]
    implicit val rowFormat          = Json.format[NewsRow]
    implicit val layoutFormat       = Json.format[Layout]
  }

}
