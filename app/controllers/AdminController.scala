package controllers

import javax.inject._
import controllers.stack.LoggingElement
import jp.t2v.lab.play2.auth.AuthElement
import models.CoreModels.{Article, Language, Layout}
import play.api.Environment
import play.api.i18n.{I18nSupport, MessagesApi}
import play.api.libs.json.{JsArray, JsString, Json}
import play.api.mvc._
import services.ArticleService
import scala.util.{Failure, Success}

@Singleton
class AdminController @Inject()(
  env: Environment,
  articleService: ArticleService,
  val messagesApi: MessagesApi
) extends Controller with I18nSupport with AuthElement with BnAuthConfig with LoggingElement {

  import models.Implicits._
  import models.Role._
  import scala.io.Source

  val langs = JsArray(Language.values.map(l => Json.obj("value" -> l.code, "label" -> l.name)).toSeq)

  def tags = JsArray(articleService.allTags.map(t => JsString(t.text)).toSeq)
  def layoutContentStr(name: String) = env.resourceAsStream(s"layouts/$name.json").map(is => Source.fromInputStream(is).mkString).getOrElse(throw new RuntimeException(s"no $name layout"))
  def parsedLayout(name: String) = name -> Json.parse(layoutContentStr(name)).as[Layout]

  def layout = StackAction(AuthorityKey -> Administrator) { implicit request =>
    Ok(views.html.admin.layouts())
  }
  def index = StackAction(AuthorityKey -> Administrator) { implicit request =>
    val articles = Json.toJson(articleService.allArticles(false).sortBy(-_.publish.getMillis))
    Ok(views.html.admin.index(Json.stringify(articles)))
  }
  def articleNew = getArticle(None)
  def article(id: Long) = getArticle(Some(id))
  def articleSave = StackAction(AuthorityKey -> Administrator) { implicit request =>
    request.body.asJson.map(json => json.as[Article])
      .map(article => articleService.saveArticle(article)) match {
      case Some(Success(id)) => Ok(Json.obj("result" -> "Article saved!", "article_id" -> id)).as(JSON)
      case Some(Failure(e)) => InternalServerError(Json.obj("result" -> s"Error: ${e.getMessage}")).as(JSON)
      case None => BadRequest(Json.obj("result" -> s"Bad request")).as(JSON)
    }
  }
  def articleDelete(id: Long) = StackAction(AuthorityKey -> Administrator) { implicit request =>
    Redirect(routes.AdminController.index())
  }
  def getArticle(idOpt: Option[Long]) = StackAction(AuthorityKey -> Administrator) { implicit request =>
    val articleOpt = idOpt match {
      case Some(id) => articleService.findArticle(id)
      case None => Some(Article.newArticle)
    }
    articleOpt.map(t => Json.toJson(t)) match {
      case Some(article) => Ok(views.html.admin.article(Json.stringify(article), Json.stringify(tags), Json.stringify(langs)))
      case None => NotFound("Article not found")
    }
  }

}
