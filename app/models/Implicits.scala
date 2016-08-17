package models

import models.NewsModel.BlockSize.BlockSize
import models.NewsModel.Language.Language
import models.NewsModel.NewsType.NewsType
import models.NewsModel.RowHeight._
import models.NewsModel.{Language, RowHeight, _}
import org.joda.time.DateTime
import play.api.libs.json._

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
  implicit val mediaFormat                                       = Json.format[NewsMedia]
  implicit val translationFormat                                 = Json.format[Translation]
  implicit val articleFormat                                     = Json.format[Article]
  implicit val newsFormat                                        = Json.format[NewsBlock]
  implicit val rowFormat                                         = Json.format[NewsRow]
  implicit val layoutFormat                                      = Json.format[Layout]
  implicit val articleWritesTransform: (Article) => JsObject     = (article) =>
    Json.toJson(article).as[JsObject] ++ JsObject(List(
      "publish_time" -> JsString(Article.publishFormat(article))
    )) - "publish"
  implicit val articleReadsTransform : (JsValue) => Article      = { (json) =>
    val publishDate = Article.publishParse((json \\ "publish_time").headOption.map(_.as[String])).getOrElse(DateTime.now()).getMillis
    val transformedJson = json.as[JsObject] + ("publish", JsNumber(publishDate))
    transformedJson.as[Article]
  }
  implicit val articlesTransform     : (Seq[Article]) => JsArray = (articles) => JsArray(articles.map(articleWritesTransform))

}
