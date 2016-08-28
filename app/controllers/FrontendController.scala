package controllers

import javax.inject._
import models.CoreModels.{Language, Layout}
import play.api.Environment
import play.api.i18n.{I18nSupport, MessagesApi}
import play.api.libs.json.Json
import play.api.mvc._
import services.ArticleService
import scala.concurrent.Future
import scala.util.Try

@Singleton
class FrontendController @Inject()(
  env: Environment,
  articleService: ArticleService,
  val messagesApi: MessagesApi
) extends Controller with I18nSupport with LoggingActions with LangActions {

  import models.Implicits._
  import scala.concurrent.ExecutionContext.Implicits.global
  import scala.io.Source

  val MAIN_LAYOUT = "main"
  val layouts     = (articleService.allRootTags.map(t => parsedLayout(t.text)) + parsedLayout(MAIN_LAYOUT)).toMap

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

  def tracking = AsyncStack { implicit request => Future {
    Ok(views.html.tracking())
  }
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
