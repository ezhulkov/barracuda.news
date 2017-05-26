package controllers

import javax.inject._
import akka.util.ByteString
import controllers.stack.LangRedirectElement
import controllers.stack.LoggingElement
import models.CoreModels.Layout
import models.CoreModels.Subscribe
import models.CoreModels.TrackingEvent
import play.api.Environment
import play.api.Logger
import play.api.cache.CacheApi
import play.api.http.HttpEntity
import play.api.i18n.I18nSupport
import play.api.i18n.MessagesApi
import play.api.libs.json.JsArray
import play.api.libs.json.Json
import play.api.libs.json.__
import play.api.libs.ws.WSClient
import play.api.mvc._
import services.ArticleService
import services.EmailService
import services.LangUtils
import services.LayoutService
import utils.Configuration
import scala.concurrent.Future
import scala.concurrent.duration.Duration
import scala.concurrent.duration.MILLISECONDS
import scala.concurrent.duration.SECONDS
import scala.util.Try

@Singleton
class FrontendController @Inject()(
  implicit val env: Environment,
  articleService: ArticleService,
  emailService: EmailService,
  layoutService: LayoutService,
  cache: CacheApi,
  ws: WSClient,
  val messagesApi: MessagesApi
) extends Controller with I18nSupport with LoggingElement with LangRedirectElement {

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
  def topic(tag: String) = AsyncStack { implicit request =>
    Future {
      val articles = articleService.allTagged(tag)
        .filter(article => article.translation.exists(t => t.caption.isDefined))
        .filter(article => article.publish.isBeforeNow)
        .take(100)
      Ok(views.html.topic(layoutService.findByTag(tag).flatMap(l => l.config), articles, tag))
    }
  }
  def article(url: String) = AsyncStack(implicit request => Future {
    articleService.findArticleByOldUrl(url) match {
      case Some(article) if article.shortUrl.isDefined =>
        Logger.info(s"Redirecting from old url $url to ${article.shortUrl.get}")
        MovedPermanently(LangUtils.addLang(s"/article/${article.shortUrl.get}"))
      case _ => articleService.findArticle(url).orElse(articleService.findArticle(Try(url.toLong).getOrElse(-1L)))
        .filter(article => article.translation.exists(t => t.caption.isDefined))
        .map(article => Ok(views.html.article(article)))
        .getOrElse(NotFound(views.html.errors.e404()))
    }
  }
  )
  def newsList(tag: String, offset: Option[Int]) = AsyncStack(implicit request => Future(Ok(views.html.components.newsListBlock(articleService.allTagged(tag), None))))
  def search(q: String) = AsyncStack { implicit request =>
    Future {
      val articles = Json.toJson(articleService.search(q).sortBy(-_.publish.getMillis))
      val pruned = JsArray(articles.asInstanceOf[JsArray].value.map { t => t.transform((__ \ 'translations).json.prune).get })
      Ok(pruned).as(JSON)
    }
  }
  def tracking = AsyncStack(implicit request => trackingData.map(t => Ok(views.html.tracking(t))))
  def about = AsyncStack(implicit request => Future(Ok(views.html.about())))
  def contacts = AsyncStack(implicit request => Future(Ok(views.html.contacts())))
  def exception = StackAction(request => throw new RuntimeException())
  def adv = AsyncStack(implicit request => Future(Ok(views.html.adv())))
  def forbidden = AsyncStack(implicit request => Future(Forbidden(views.html.errors.e403())))
  def sitemapPage = AsyncStack(implicit request => Future(Ok(views.html.sitemapPage())))
  def subscribe = AsyncStack { implicit request =>
    request.body.asJson.map(json => json.as[Subscribe])
      .map(emailService.subscribe)
      .getOrElse(Future(play.api.http.Status.BAD_REQUEST))
      .map { rs =>
        Result(
          header = ResponseHeader(rs, Map.empty),
          body = HttpEntity.Strict(ByteString("done"), Some("text/plain"))
        )
      }
  }
  def sitemapXml = AsyncStack(implicit request => Future {
    val news = articleService.allArticles()
    Ok(views.html.sitemapXml(news).body.trim).as(XML)
  })
  def rss = AsyncStack(implicit request => Future {
    val news = articleService.allArticles()
    Ok(views.html.rss(news).body.trim).as(XML)
  })
  def updateAllArticles() = AsyncStack(implicit request => Future {
    articleService.allArticles(false).foreach { a =>
      articleService.saveArticle(a)
    }
    Ok("done")
  }
  )

}
