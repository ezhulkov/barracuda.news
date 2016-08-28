package models

import models.CoreModels.BlockSize.BlockSize
import models.CoreModels.Language.Language
import models.CoreModels.NewsType.NewsType
import models.CoreModels.RowHeight._
import models.CoreModels.{Language, RowHeight, _}
import org.joda.time.DateTime
import play.api.libs.json._
import scala.util.Try

/**
  * Created by ezhulkov on 04.07.16.
  */
object Implicits {

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
  implicit val langsEnumFormat    = new Format[Language] {
    def reads(json: JsValue) = JsSuccess(Language.withName(json.as[String]))
    def writes(ob: Language) = JsString(ob.toString)
  }
  implicit val tagFormat          = Json.format[Tag]
  implicit val mediaFormat        = Json.format[NewsMedia]
  implicit val translationFormat  = Json.format[Translation]
  implicit val articleFormat      = Json.format[Article]
  implicit val newsFormat         = Json.format[NewsBlock]
  implicit val rowFormat          = Json.format[NewsRow]
  implicit val layoutFormat       = Json.format[Layout]
  implicit val articleReads       = Json.reads[Article]
  implicit val articleWrites      = JsonPimped.writes[Article](Json.writes[Article]) { case (json, obj) =>
    json.asInstanceOf[JsObject] +
      ("publish_time_formatted", JsString(obj.publishFormatted)) +
      ("caption", JsString(obj.translations.map(t => t.caption).mkString("; ")))
  }
}


object JsonPimped {

  private def partialIdentity: PartialFunction[JsValue, JsValue] = {
    case o => o
  }
  private def partialTupleIdObj[T]: PartialFunction[(JsValue, T), T] = {
    case (json, obj) => obj
  }
  private def partialTupleIdJson[T]: PartialFunction[(JsValue, T), JsValue] = {
    case (json, obj) => json
  }

  def reads[T](root: Reads[T])(preF: PartialFunction[JsValue, JsValue] = partialIdentity)(postF: PartialFunction[(JsValue, T), T] = partialTupleIdObj): Reads[T] = new Reads[T]() {
    override def reads(json: JsValue): JsResult[T] = {
      val postJson = if (preF.isDefinedAt(json)) preF(json) else json
      root.reads(postJson) match {
        case r if r.isInstanceOf[JsSuccess[T]] =>
          val jsResult = r.asInstanceOf[JsSuccess[T]]
          val postObject = if (postF.isDefinedAt((postJson, jsResult.value))) postF(postJson, jsResult.value) else jsResult.value
          JsSuccess(postObject, jsResult.path)
        case default => default
      }
    }
  }

  def writes[T](root: Writes[T])(f: PartialFunction[(JsValue, T), JsValue] = partialTupleIdJson): Writes[T] = new Writes[T]() {
    override def writes(obj: T): JsValue = {
      val jsValue = root.writes(obj)
      if (f.isDefinedAt((jsValue, obj))) f(jsValue, obj) else jsValue
    }
  }

}