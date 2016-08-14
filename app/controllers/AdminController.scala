package controllers

import java.util.Date
import javax.inject._
import controllers.actions.LoggingAction
import models.NewsModel.{Layout, NewsMedia, PeaceOfNews}
import play.api.Environment
import play.api.libs.json.Json
import play.api.mvc._
import views.formdata.ArticleFormData
import scala.concurrent.Future
import play.api.i18n.{I18nSupport, MessagesApi}

@Singleton
class AdminController @Inject()(
  env: Environment,
  val messagesApi: MessagesApi
) extends Controller with I18nSupport {

  import models.Implicits.JsonImplicits._
  import play.api.data.Forms._
  import play.api.data._
  import scala.concurrent.ExecutionContext.Implicits.global
  import scala.io.Source

  val articleForm = Form(
    mapping(
      "caption" -> text,
      "text" -> text,
      "publishDate" -> default(date, new Date()),
      "tags" -> text,
      "media" -> optional(mapping(
        "source" -> text,
        "text" -> optional(text)
      )(NewsMedia.apply)(NewsMedia.unapply))
    )(ArticleFormData.apply)(ArticleFormData.unapply)
  )

  private val sampleNews = layoutContentStr("news")
  def layoutContentStr(name: String) = env.resourceAsStream(s"layouts/$name.json").map(is => Source.fromInputStream(is).mkString).getOrElse(throw new RuntimeException(s"no $name layout"))
  def parsedLayout(name: String) = name -> Json.parse(layoutContentStr(name)).as[Layout]

  def index = LoggingAction.async { implicit request => Future(Ok(views.html.admin.index(sampleNews))) }
  def indexPost = LoggingAction.async { implicit request => Future(Redirect(routes.AdminController.index())) }
  def layout = LoggingAction.async { implicit request => Future(Ok(views.html.admin.layouts())) }
  def layoutPost = LoggingAction.async { implicit request => Future(Redirect(routes.AdminController.layout())) }
  def article = LoggingAction.async { implicit request => Future {
    val article = ArticleFormData.from(Json.parse(sampleNews).as[Seq[PeaceOfNews]].head)
    val filledForm = articleForm.fill(article)
    Ok(views.html.admin.article(filledForm))
  }
  }
  def articlePost = LoggingAction.async { implicit request => Future {
    articleForm.bindFromRequest.fold(
      formWithErrors => BadRequest(views.html.admin.article(formWithErrors)),
      article => {
        Redirect(routes.AdminController.article()).flashing("success" -> "Article saved!")
      }
    )
  }
  }

}
