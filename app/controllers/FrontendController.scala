package controllers

import javax.inject._
import controllers.actions.LoggingAction
import models.CoreModels.Layout
import play.api.Environment
import play.api.i18n.{I18nSupport, MessagesApi}
import play.api.libs.json.Json
import play.api.mvc._
import services.ArticleService
import scala.concurrent.Future

@Singleton
class FrontendController @Inject()(
  env: Environment,
  articleService: ArticleService,
  val messagesApi: MessagesApi
) extends Controller with I18nSupport {

  import models.Implicits._
  import scala.concurrent.ExecutionContext.Implicits.global
  import scala.io.Source

  private val MAIN_TAG = "main"
  private val layouts  = articleService.allRootTags.map(t => parsedLayout(t.text)).toMap

  def layoutContentStr(name: String) = env.resourceAsStream(s"layouts/$name.json").map(is => Source.fromInputStream(is).mkString).getOrElse(throw new RuntimeException(s"no $name layout"))
  def parsedLayout(name: String) = name -> Json.parse(layoutContentStr(name)).as[Layout]

  def index = LoggingAction.async { implicit request => Future(Ok(views.html.index(layouts.get(MAIN_TAG), articleService.allArticles))) }
  def article = LoggingAction.async { implicit request => Future(Ok(views.html.article())) }
  def topic(name: String) = LoggingAction.async { implicit request => Future(Ok(views.html.topic(layouts.get(name), articleService.allTagged(name)))) }

  def search(q: String) = Action.async { implicit request => Future(Ok(Json.toJson(articleService.search(q))).as(JSON)) }

  def about = LoggingAction.async { implicit request => Future(Ok(views.html.about())) }
  def contacts = LoggingAction.async { implicit request => Future(Ok(views.html.contacts())) }
  def adv = LoggingAction.async { implicit request => Future(Ok(views.html.adv())) }

}
