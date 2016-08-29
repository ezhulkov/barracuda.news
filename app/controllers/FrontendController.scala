package controllers

import javax.inject._
import controllers.stack.{LangElement, LoggingElement}
import models.CoreModels.{Language, Layout, TrackingEvent}
import play.api.{Environment, Logger}
import play.api.cache.CacheApi
import play.api.i18n.{I18nSupport, MessagesApi}
import play.api.libs.json.Json
import play.api.libs.ws.WSClient
import play.api.mvc._
import services.ArticleService
import utils.Configuration
import scala.concurrent.{Await, Future}
import scala.concurrent.duration.{Duration, MILLISECONDS, MINUTES}
import scala.util.{Success, Try}

@Singleton
class FrontendController @Inject()(
  env: Environment,
  articleService: ArticleService,
  cache: CacheApi,
  ws: WSClient,
  val messagesApi: MessagesApi
) extends Controller with I18nSupport with LoggingElement with LangElement {

  import models.Implicits._
  import scala.concurrent.ExecutionContext.Implicits.global
  import scala.io.Source

  val MAIN_LAYOUT  = "main"
  val layouts      = (articleService.allRootTags.map(t => parsedLayout(t.text)) + parsedLayout(MAIN_LAYOUT)).toMap
  val trackingKey  = "tracking"
  val trackingUrl  = Configuration.getValue[String]("tracking.url").getOrElse(throw new RuntimeException("bad config"))
  val trackingData = cache.getOrElse[Future[Seq[TrackingEvent]]](trackingKey) {
    val wsResult = ws.url(trackingUrl).withFollowRedirects(true).withRequestTimeout(Duration(1000, MILLISECONDS)).get()
    val result = wsResult.map(r => r.json.as[Seq[TrackingEvent]])
    cache.set(trackingKey, result, Duration(10, MINUTES))
    result
  }

  def layoutContentStr(name: String) = env.resourceAsStream(s"layouts/$name.json").map(is => Source.fromInputStream(is).mkString).getOrElse(throw new RuntimeException(s"no $name layout"))
  def parsedLayout(name: String) = name -> Json.parse(layoutContentStr(name)).as[Layout]

  def index() = AsyncStack { implicit request => Future {
    Ok(views.html.index(layouts.get(MAIN_LAYOUT), articleService.allArticles()))
  }
  }
  def article(url: String) = AsyncStack { implicit request => Future {
    articleService.findArticle(url).orElse(articleService.findArticle(Try(url.toLong).getOrElse(-1L))) match {
      case Some(article) => Ok(views.html.article(article))
      case None => NotFound("Article not found")
    }
  }
  }
  def topic(name: String) = AsyncStack { implicit request => Future {
    Ok(views.html.topic(layouts.get(name), articleService.allTagged(name), Some(name)))
  }
  }

  def search(q: String) = AsyncStack { implicit request => Future(Ok(Json.toJson(articleService.search(q))).as(JSON)) }

  def tracking = AsyncStack { implicit request =>
    trackingData.map(t => Ok(views.html.tracking(t)))
  }
  def about = AsyncStack { implicit request => Future {
    Ok(views.html.about())
  }
  }
  def contacts = AsyncStack { implicit request => Future {
    Ok(views.html.contacts())
  }
  }
  def adv = AsyncStack { implicit request => Future {
    Ok(views.html.adv())
  }
  }

}
