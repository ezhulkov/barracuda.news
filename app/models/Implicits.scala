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

  implicit val sizeEnumFormat                                    = new Format[BlockSize] {
    def reads(json: JsValue) = JsSuccess(BlockSize.withName(json.as[String]))
    def writes(ob: BlockSize) = JsString(ob.toString)
  }
  implicit val heightEnumFormat                                  = new Format[RowHeight] {
    def reads(json: JsValue) = JsSuccess(RowHeight.withName(json.as[String]))
    def writes(ob: RowHeight) = JsString(ob.toString)
  }
  implicit val newsTypeEnumFormat                                = new Format[NewsType] {
    def reads(json: JsValue) = JsSuccess(NewsType.withName(json.as[String]))
    def writes(ob: NewsType) = JsString(ob.toString)
  }
  implicit val langsEnumFormat                                   = new Format[Language] {
    def reads(json: JsValue) = JsSuccess(Language.withName(json.as[String]))
    def writes(ob: Language) = JsString(ob.toString)
  }
  implicit val tagFormat                                         = Json.format[Tag]
  implicit val mediaFormat                                       = Json.format[NewsMedia]
  implicit val translationFormat                                 = Json.format[Translation]
  implicit val articleFormat                                     = Json.format[Article]
  implicit val newsFormat                                        = Json.format[NewsBlock]
  implicit val rowFormat                                         = Json.format[NewsRow]
  implicit val layoutFormat                                      = Json.format[Layout]
  implicit val articleWritesTransform: (Article) => JsObject     = (article) =>
    Json.toJson(article).as[JsObject] ++ JsObject(List(
      "publish_time" -> JsString(article.publish.toString),
      "publish_time_formatted" -> JsString(article.publishFormatted),
      "caption" -> JsString(article.translations.map(t => t.caption).mkString("; "))
    )) - "publish"
  implicit val articleReadsTransform : (JsValue) => Try[Article] = { (json) =>
    val publishDate = (json \\ "publish_time").headOption.map(_.as[String]).map(t => DateTime.parse(t)).getOrElse(DateTime.now()).getMillis
    val transformedJson = json.as[JsObject] + ("publish", JsNumber(publishDate))
    Try(transformedJson.as[Article])
  }
  implicit val articlesTransform     : (Seq[Article]) => JsArray = (articles) => JsArray(articles.map(articleWritesTransform))

}
