package controllers

import javax.inject._
import controllers.refiners.LangAction
import models.CoreModels.Layout
import play.api.Environment
import play.api.i18n.{I18nSupport, Lang, MessagesApi}
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
) extends Controller with I18nSupport {

  import models.Implicits._
  import scala.concurrent.ExecutionContext.Implicits.global
  import scala.io.Source

  val MAIN_LAYOUT = "main"
  val layouts     = (articleService.allRootTags.map(t => parsedLayout(t.text)) + parsedLayout(MAIN_LAYOUT)).toMap

  def layoutContentStr(name: String) = env.resourceAsStream(s"layouts/$name.json").map(is => Source.fromInputStream(is).mkString).getOrElse(throw new RuntimeException(s"no $name layout"))
  def parsedLayout(name: String) = name -> Json.parse(layoutContentStr(name)).as[Layout]

  def index() = LangAction { request =>
    implicit val langInfo = request.langInfo
    messagesApi.setLang(
      Ok(views.html.index(layouts.get(MAIN_LAYOUT), articleService.allArticles())),
      Lang.defaultLang
    )
  }
  def article(url: String) = LangAction.async { request => Future {
    implicit val langInfo = request.langInfo
    messagesApi.setLang(
      articleService.findArticle(url).orElse(articleService.findArticle(Try(url.toLong).getOrElse(-1L))) match {
        case Some(article) => Ok(views.html.article(article))
        case None => NotFound("Article not found")
      },
      Lang.defaultLang
    )
  }
  }
  def topic(name: String) = LangAction { implicit request =>
    implicit val langInfo = request.langInfo
    messagesApi.setLang(
      Ok(views.html.topic(layouts.get(name), articleService.allTagged(name), Some(name))),
      Lang.defaultLang
    )
  }

  def search(q: String) = Action.async { implicit request => Future(Ok(Json.toJson(articleService.search(q))).as(JSON)) }

  def tracking = LangAction { request =>
    implicit val langInfo = request.langInfo
    messagesApi.setLang(
      Ok(views.html.tracking()),
      Lang.defaultLang
    )
  }
  def about = LangAction { request =>
    implicit val langInfo = request.langInfo
    messagesApi.setLang(
      Ok(views.html.about()),
      Lang.defaultLang
    )
  }
  def contacts = LangAction { request =>
    implicit val langInfo = request.langInfo
    messagesApi.setLang(
      Ok(views.html.contacts()),
      Lang.defaultLang
    )
  }
  def adv = LangAction { request =>
    implicit val langInfo = request.langInfo
    messagesApi.setLang(
      Ok(views.html.adv()),
      Lang.defaultLang
    )
  }

}
