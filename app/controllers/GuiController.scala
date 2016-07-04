package controllers

import javax.inject._
import controllers.actions.LoggingAction
import models.NewsModel.{Layout, PeaceOfNews}
import play.api.Environment
import play.api.libs.json.Json
import play.api.mvc._
import scala.concurrent.Future
import scala.io.Source

@Singleton
class GuiController @Inject()(
  env: Environment
) extends Controller {

  import models.Implicits.JsonImplicits._
  import scala.concurrent.ExecutionContext.Implicits.global

  lazy val sampleNewsStr = env.resourceAsStream("layouts/news.json").map(is => Source.fromInputStream(is).mkString).getOrElse(throw new RuntimeException("no sample news"))
  lazy val mainLayoutStr = env.resourceAsStream("layouts/main.json").map(is => Source.fromInputStream(is).mkString).getOrElse(throw new RuntimeException("no main layout"))
  lazy val sampleNews    = Json.parse(sampleNewsStr).as[Seq[PeaceOfNews]].flatMap(n => n.tags.map(t => t -> n)).toMap
  lazy val mainLayout    = Json.parse(mainLayoutStr).as[Layout]

  def index = LoggingAction.async { implicit request =>
    Future(Ok(views.html.index(mainLayout,sampleNews)))
  }

}
