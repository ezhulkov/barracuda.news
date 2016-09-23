package models

import com.github.nscala_time.time.TypeImports
import models.CoreModels.BlockSize.BlockSize
import models.CoreModels.NewsType.NewsType
import models.CoreModels.RowHeight
import models.CoreModels.RowHeight._
import models.CoreModels._
import play.api.i18n.Lang
import play.api.libs.json._
import services.LangUtils

/**
  * Created by ezhulkov on 04.07.16.
  */
object Implicits {

  implicit def dateTimeOrdering: Ordering[TypeImports.DateTime] = Ordering.fromLessThan(_ isAfter _)

  implicit val sizeEnumFormat      = new Format[BlockSize] {
    def reads(json: JsValue) = JsSuccess(BlockSize.withName(json.as[String]))
    def writes(ob: BlockSize) = JsString(ob.toString)
  }
  implicit val heightEnumFormat    = new Format[RowHeight] {
    def reads(json: JsValue) = JsSuccess(RowHeight.withName(json.as[String]))
    def writes(ob: RowHeight) = JsString(ob.toString)
  }
  implicit val newsTypeEnumFormat  = new Format[NewsType] {
    def reads(json: JsValue) = JsSuccess(NewsType.withName(json.as[String]))
    def writes(ob: NewsType) = JsString(ob.toString)
  }
  implicit val langsEnumFormat     = new Format[Lang] {
    def reads(json: JsValue) = JsSuccess(Lang(json.as[String]))
    def writes(ob: Lang) = JsString(ob.code)
  }
  implicit val trackingRaceReads   = Json.reads[TrackingRace]
  implicit val trackingEventReads  = Json.reads[TrackingEvent]
  implicit val trackingRaceWrites  = JsonPimped.writes[TrackingRace](Json.writes[TrackingRace]) { case (json, obj) =>
    json.asInstanceOf[JsObject] +
      ("start_formatted", JsString(obj.startFormatted)) +
      ("end_formatted", JsString(obj.endFormatted))
  }
  implicit val trackingEventWrites = JsonPimped.writes[TrackingEvent](Json.writes[TrackingEvent]) { case (json, obj) =>
    json.asInstanceOf[JsObject] +
      ("start_formatted", JsString(obj.startFormatted)) +
      ("end_formatted", JsString(obj.endFormatted))
  }
  implicit val tagFormat           = Json.format[Tag]
  implicit val mediaFormat         = Json.format[NewsMedia]
  implicit val translationFormat   = Json.format[Translation]
  implicit val blockCaptionFormat  = Json.format[BlockCaption]
  implicit val newsFormat          = Json.format[NewsBlock]
  implicit val rowFormat           = Json.format[NewsRow]
  implicit val layoutConfigFormat  = Json.format[LayoutConfig]
  implicit val layoutFormatReads   = JsonPimped.reads[Layout](Json.reads[Layout])() { case (json, obj) =>
    (json \ "config").toOption match {
      case Some(config) => obj.copy(rawConfig = Some(Json.stringify(config)))
      case _ => obj
    }
  }
  implicit val layoutFormatWrites  = JsonPimped.writes[Layout](Json.writes[Layout]) { case (json, obj) => obj.rawConfig match {
    case Some(conf) => json.asInstanceOf[JsObject] + ("config", Json.parse(conf)) - "rawConfig"
    case _ => json
  }
  }
  implicit val articleReads        = Json.reads[Article]
  implicit val articleWrites       = JsonPimped.writes[Article](Json.writes[Article]) { case (json, obj) =>
    json.asInstanceOf[JsObject] +
      ("publish_time_formatted", JsString(obj.publishFormatted)) +
      ("caption", JsString(obj.translationOrDefault(LangUtils.defaultLang).caption.getOrElse("-")))
  }

}

object JsonPimped {

  def partialIdentity: PartialFunction[JsValue, JsValue] = {
    case o => o
  }
  def partialTupleIdObj[T]: PartialFunction[(JsValue, T), T] = {
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