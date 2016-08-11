package controllers

import javax.inject._
import controllers.actions.LoggingAction
import models.NewsModel.Layout
import play.api.Environment
import play.api.libs.json.Json
import play.api.mvc._
import scala.concurrent.Future
import scala.io.Source

@Singleton
class AdminController @Inject()(
  env: Environment
) extends Controller {

  import models.Implicits.JsonImplicits._
  import scala.concurrent.ExecutionContext.Implicits.global

  private val sampleNews = layoutContentStr("news")
  def layoutContentStr(name: String) = env.resourceAsStream(s"layouts/$name.json").map(is => Source.fromInputStream(is).mkString).getOrElse(throw new RuntimeException(s"no $name layout"))
  def parsedLayout(name: String) = name -> Json.parse(layoutContentStr(name)).as[Layout]

  def index = LoggingAction.async { implicit request => Future(Ok(views.html.admin.index(sampleNews))) }
  def layout = LoggingAction.async { implicit request => Future(Ok(views.html.admin.layouts())) }
  def article = LoggingAction.async { implicit request => Future(Ok(views.html.admin.article())) }

}
