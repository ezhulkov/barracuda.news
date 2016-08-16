package controllers

import javax.inject._
import controllers.actions.LoggingAction
import models.NewsModel.{Article, Layout}
import play.api.Environment
import play.api.i18n.{I18nSupport, MessagesApi}
import play.api.libs.json.{JsArray, JsString, Json}
import play.api.mvc._
import scala.concurrent.Future

@Singleton
class AdminController @Inject()(
  env: Environment,
  val messagesApi: MessagesApi
) extends Controller with I18nSupport {

  import models.Implicits._
  import scala.concurrent.ExecutionContext.Implicits.global
  import scala.io.Source

  val sampleNews = Json.parse(layoutContentStr("news")).as[Seq[Article]]
  val tags       = JsArray(sampleNews.flatMap(t => t.tags.getOrElse(Nil)).distinct.map(t => JsString(t)))
  def layoutContentStr(name: String) = env.resourceAsStream(s"layouts/$name.json").map(is => Source.fromInputStream(is).mkString).getOrElse(throw new RuntimeException(s"no $name layout"))
  def parsedLayout(name: String) = name -> Json.parse(layoutContentStr(name)).as[Layout]

  def layout = LoggingAction.async { implicit request => Future(Ok(views.html.admin.layouts())) }
  def index = LoggingAction.async { implicit request => Future {
    Ok(views.html.admin.index(Json.stringify(sampleNews)))
  }
  }
  def article(id: Long) = LoggingAction.async { implicit request => Future {
    sampleNews.find(t => t.id.contains(id))
      .map(article => Ok(views.html.admin.article(Json.stringify(article), Json.stringify(tags))))
      .getOrElse(NotFound("Article not found"))
  }
  }
  def articlePost = LoggingAction.async { implicit request => Future {
    Redirect(routes.AdminController.article(1)).flashing(("result", "123"))
  }
  }
  def articleDelete(id: Long) = LoggingAction.async { implicit request => Future {
    Ok("")
  }
  }

}
