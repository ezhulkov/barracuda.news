package controllers

import java.util.concurrent.TimeUnit
import javax.inject._
import controllers.stack.LoggingElement
import models.CoreModels.Layout
import models.CoreModels.TrackingEvent
import play.api.Environment
import play.api.Logger
import play.api.cache.CacheApi
import play.api.i18n.I18nSupport
import play.api.i18n.MessagesApi
import play.api.libs.json.Json
import play.api.libs.ws.WSClient
import play.api.mvc._
import services.ArticleService
import services.LayoutService
import utils.Configuration
import scala.concurrent.{Await, Future}
import scala.concurrent.duration.Duration
import scala.concurrent.duration.MILLISECONDS
import scala.concurrent.duration.SECONDS
import scala.util.Try

@Singleton
class FrontendController @Inject()(
  implicit env: Environment,
  articleService: ArticleService,
  layoutService: LayoutService,
  cache: CacheApi,
  ws: WSClient,
  val messagesApi: MessagesApi
) extends Controller with I18nSupport with LoggingElement {

  import models.Implicits._
  import scala.concurrent.ExecutionContext.Implicits.global
  import scala.io.Source

  val MAIN_LAYOUT = "main"
  val layouts     = (articleService.allRootTags.map(t => parsedLayout(t.text.orNull)) + parsedLayout(MAIN_LAYOUT)).toMap
  val trackingKey = "tracking"
  val trackingUrl = Configuration.getValue[String]("tracking.url").getOrElse(throw new RuntimeException("bad config"))
  def trackingData = cache.getOrElse[Future[Seq[TrackingEvent]]](trackingKey, Duration(60, SECONDS)) {
    val duration = Duration(2000, MILLISECONDS)
    val wsResult = ws.url(trackingUrl).withFollowRedirects(true).withRequestTimeout(duration).get()
    wsResult
      .map { r => r.json.as[Seq[TrackingEvent]] }
      .recover {
        case e: Exception =>
          cache.remove(trackingKey)
          Logger.error("", e)
          Nil
      }
  }

  def layoutContentStr(name: String) = env.resourceAsStream(s"layouts/$name.json").map(is => Source.fromInputStream(is).mkString).getOrElse(throw new RuntimeException(s"no $name layout"))
  def parsedLayout(name: String) = name -> Json.parse(layoutContentStr(name)).as[Layout]

  def index() = topic(MAIN_LAYOUT)
  def topic(tag: String, title: Option[String] = None) = AsyncStack { implicit request => Future {
    val articles = articleService.allTagged(tag)
      .filter(article => article.translation.exists(t => t.caption.isDefined))
      .take(100)
    Ok(views.html.topic(layoutService.findByTag(tag).flatMap(l => l.config), articles, tag, title))
  }
  }
  def article(url: String) = AsyncStack(implicit request => Future {
    articleService.findArticle(url).orElse(articleService.findArticle(Try(url.toLong).getOrElse(-1L)))
      .filter(article => article.translation.exists(t => t.caption.isDefined))
      .map(article => Ok(views.html.article(article)))
      .getOrElse(NotFound(views.html.errors.e404()))
  }
  )
  def newsList(tag: String, offset: Option[Int]) = AsyncStack(implicit request => Future(Ok(views.html.components.newsListBlock(articleService.allTagged(tag), None))))
  def search(q: String) = AsyncStack { implicit request => Future(Ok(Json.toJson(articleService.search(q))).as(JSON)) }
  def tracking = AsyncStack(implicit request => trackingData.map(t => Ok(views.html.tracking(t))))
  def about = AsyncStack(implicit request => Future(Ok(views.html.about())))
  def contacts = AsyncStack(implicit request => Future(Ok(views.html.contacts())))
  def exception = StackAction(request => throw new RuntimeException())
  def adv = AsyncStack(implicit request => Future(Ok(views.html.adv())))

}
