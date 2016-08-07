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

  private val sampleNews    = Json.parse(layoutContentStr("news")).as[Seq[PeaceOfNews]].flatMap(t => t.tags.map(tag => tag -> t)).groupBy { case (t, n) => t }.map { case (t, v) => t -> v.map(k => k._2) }
  private val layouts       = Map(
    parsedLayout("main"),
    parsedLayout("stories"),
    parsedLayout("tracking"),
    parsedLayout("media"),
    parsedLayout("fish")
  )

  def layoutContentStr(name: String) = env.resourceAsStream(s"layouts/$name.json").map(is => Source.fromInputStream(is).mkString).getOrElse(throw new RuntimeException(s"no $name layout"))
  def parsedLayout(name: String) = name -> Json.parse(layoutContentStr(name)).as[Layout]

  def index = LoggingAction.async { implicit request => Future(Ok(views.html.index(layouts.get("main"), sampleNews))) }
  def article = LoggingAction.async { implicit request => Future(Ok(views.html.article())) }
  def topic(name: String) = LoggingAction.async { implicit request => Future(Ok(views.html.topic(layouts.get(name), sampleNews))) }

  def about = LoggingAction.async { implicit request => Future(Ok(views.html.about())) }
  def contacts = LoggingAction.async { implicit request => Future(Ok(views.html.contacts())) }
  def adv = LoggingAction.async { implicit request => Future(Ok(views.html.adv())) }

}
