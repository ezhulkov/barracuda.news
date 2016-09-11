package models

import com.github.nscala_time.time.TypeImports
import models.CoreModels.BlockSize.BlockSize
import models.CoreModels.Language.Language
import models.CoreModels.NewsType.NewsType
import models.CoreModels.RowHeight._
import models.CoreModels.{Language, RowHeight, _}
import play.api.libs.json.{JsNumber, _}

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
  implicit val langsEnumFormat     = new Format[Language] {
    def reads(json: JsValue) = JsSuccess(Language.withName(json.as[String]))
    def writes(ob: Language) = JsString(ob.toString)
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
  implicit val newsFormat          = Json.format[NewsBlock]
  implicit val rowFormat           = Json.format[NewsRow]
  implicit val layoutFormat        = Json.format[Layout]
  implicit val articleReads        = Json.reads[Article]
  //  implicit val articleReads        = JsonPimped.reads[Article](Json.reads[Article])() { case (json, obj) =>
  //    val links = json \ "links"
  //    obj
  //  }
  implicit val articleWrites       = JsonPimped.writes[Article](Json.writes[Article]) { case (json, obj) =>
    json.asInstanceOf[JsObject] - "crossLinks" +
      ("links", JsArray(obj.crossLinks.getOrElse(Nil).map(t => Json.obj(
        "id" -> JsString(t.id.map(t => t.toString).get)
      )))) +
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