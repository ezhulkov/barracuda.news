package controllers

import javax.inject._
import controllers.stack.LangElement
import controllers.stack.LoggingElement
import models.CoreModels.Language
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
import utils.Configuration
import scala.concurrent.Future
import scala.concurrent.duration.Duration
import scala.concurrent.duration.MILLISECONDS
import scala.concurrent.duration.MINUTES
import scala.util.Try

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
    val wsResult = ws.url(trackingUrl).withFollowRedirects(true).withRequestTimeout(Duration(2000, MILLISECONDS)).get()
    val result = wsResult.map { r =>
      val res = r.json.as[Seq[TrackingEvent]]
      cache.set(trackingKey, res, Duration(10, MINUTES))
      res
    }.recover {
      case e: Exception =>
        cache.remove(trackingKey)
        Logger.error("", e)
        Nil
    }
    result
  }

  def layoutContentStr(name: String) = env.resourceAsStream(s"layouts/$name.json").map(is => Source.fromInputStream(is).mkString).getOrElse(throw new RuntimeException(s"no $name layout"))
  def parsedLayout(name: String) = name -> Json.parse(layoutContentStr(name)).as[Layout]

  def index() = topic(MAIN_LAYOUT)
  def topic(tag: String, title: Option[String] = None) = AsyncStack { implicit request => Future {
    Ok(views.html.topic(layouts.get(tag), articleService.allTagged(tag).take(100), tag, title))
  }
  }
  def article(url: String) = AsyncStack { implicit request => Future {
    articleService.findArticle(url).orElse(articleService.findArticle(Try(url.toLong).getOrElse(-1L))) match {
      case Some(article) => Ok(views.html.article(article, article.translationOrDefault(Language.ENGLISH)))
      case None => NotFound(views.html.errors.e404())
    }
  }
  }
  def newsList(tag: String, offset: Option[Int]) = AsyncStack { implicit request => Future {
    Ok(views.html.components.newsListBlock(articleService.allTagged(tag), None))
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
  def exception = StackAction(request => throw new RuntimeException())
  def adv = AsyncStack { implicit request => Future {
    Ok(views.html.adv())
  }
  }

}
