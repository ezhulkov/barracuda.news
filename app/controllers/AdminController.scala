package controllers

import javax.inject._
import controllers.stack.LoggingElement
import jp.t2v.lab.play2.auth.AuthElement
import models.CoreModels.Article
import models.CoreModels.Layout
import play.api.Environment
import play.api.i18n.I18nSupport
import play.api.i18n.MessagesApi
import play.api.libs.json._
import play.api.mvc._
import services.ArticleService
import services.LangUtils
import services.LayoutService
import services.Utils._
import scala.util.Failure
import scala.util.Success

@Singleton
class AdminController @Inject()(
  implicit env: Environment,
  articleService: ArticleService,
  layoutService: LayoutService,
  val messagesApi: MessagesApi
) extends Controller with I18nSupport with AuthElement with BnAuthConfig with LoggingElement {

  import models.Implicits._
  import models.Role._
  import scala.io.Source

  def langs = JsArray(LangUtils.langs.map(l => Json.obj("value" -> l.code, "label" -> messagesApi(s"lang.name.${l.code}"))).toSeq)
  def tags = JsArray(articleService.allTags.map(t => JsString(t.text)).toSeq)
  def rootTags = JsArray(articleService.allRootTags.map(t => Json.obj("id" -> JsNumber(t.id.get), "name" -> JsString(t.text))).toSeq)
  def layoutContentStr(name: String) = env.resourceAsStream(s"layouts/$name.json").map(is => Source.fromInputStream(is).mkString).getOrElse(throw new RuntimeException(s"no $name layout"))
  def parsedLayout(name: String) = name -> Json.parse(layoutContentStr(name)).as[Layout]

  def index = StackAction(AuthorityKey -> Administrator) { implicit request =>
    val articles = Json.toJson(articleService.allArticles(false).sortBy(-_.publish.getMillis))
    val pruned = JsArray(articles.asInstanceOf[JsArray].value.map { t => t.transform((__ \ 'translations).json.prune).get })
    Ok(views.html.admin.index(Json.stringify(pruned)))
  }
  def articleNew = getArticle(None)
  def article(id: Long) = getArticle(Some(id))
  def articleSave = StackAction(AuthorityKey -> Administrator) { implicit request =>
    request.body.asJson.map(json => json.as[Article]).map(article => articleService.saveArticle(article).recoverWith(loggedFailure())) match {
      case Some(Success(id)) => Ok(Json.obj("result" -> "Article saved!", "article_id" -> id)).as(JSON)
      case Some(Failure(e)) => InternalServerError(Json.obj("result" -> s"Error: ${e.getMessage}")).as(JSON)
      case None => BadRequest(Json.obj("result" -> s"Bad request")).as(JSON)
    }
  }
  def articleDelete(id: Long) = StackAction(AuthorityKey -> Administrator) { implicit request =>
    articleService.deleteArticle(id)
    Ok(Json.obj("result" -> "Article deleted!", "redirect_url" -> routes.AdminController.index().url.toString)).as(JSON)
  }
  def uploadCoverPhoto(id: Long) = StackAction(AuthorityKey -> Administrator) { implicit request =>
    request.body.asMultipartFormData match {
      case Some(data) if data.files.size == 1 =>
        val file = data.files.head.ref.file
        articleService.attachCoverPhoto(id, file)
        Ok(Json.obj("result" -> "Cover photo saved!", "article_id" -> id)).as(JSON)
      case _ => Ok(Json.obj("result" -> "Error saving photo!", "article_id" -> id)).as(JSON)
    }
  }

  def layouts = StackAction(AuthorityKey -> Administrator) { implicit request =>
    val layouts = Json.toJson(layoutService.allLayouts)
    Ok(views.html.admin.layouts(Json.stringify(layouts)))
  }
  def layoutNew = getLayout(None)
  def layout(id: Long) = getLayout(Some(id))
  def layoutSave = StackAction(AuthorityKey -> Administrator) { implicit request =>
    request.body.asJson.map(json => json.as[Layout]).map(layout => layoutService.saveLayout(layout).recoverWith(loggedFailure())) match {
      case Some(Success(id)) => Ok(Json.obj("result" -> "Layout saved!", "layout_id" -> id)).as(JSON)
      case Some(Failure(e)) => InternalServerError(Json.obj("result" -> s"Error: ${e.getMessage}")).as(JSON)
      case None => BadRequest(Json.obj("result" -> s"Bad request")).as(JSON)
    }
  }
  def layoutDelete(id: Long) = StackAction(AuthorityKey -> Administrator) { implicit request =>
    layoutService.deleteLayout(id)
    Ok(Json.obj("result" -> "Layout deleted!", "redirect_url" -> routes.AdminController.layouts().url.toString)).as(JSON)
  }

  private def getArticle(idOpt: Option[Long]) = StackAction(AuthorityKey -> Administrator) { implicit request =>
    val articleOpt = idOpt match {
      case Some(id) => articleService.findArticle(id)
      case None => Some(Article.newArticle)
    }
    val articles = JsArray(articleService.allArticles(false).map(t => Json.obj(
      "id" -> JsNumber(t.id.get),
      "name" -> JsString(t.translationOrDefault(LangUtils.defaultLang).caption.getOrElse("-"))
    )))
    articleOpt.map(t => Json.toJson(t)) match {
      case Some(article) => Ok(views.html.admin.article(Json.stringify(article), Json.stringify(tags), Json.stringify(langs), Json.stringify(articles)))
      case None => NotFound(views.html.errors.e404())
    }
  }
  private def getLayout(idOpt: Option[Long]) = StackAction(AuthorityKey -> Administrator) { implicit request =>
    val layoutOpt = idOpt match {
      case Some(id) => layoutService.findLayout(id)
      case None => Some(Layout.newLayout)
    }
    layoutOpt.map(t => Json.toJson(t)) match {
      case Some(layout) => Ok(views.html.admin.grid(Json.stringify(layout), Json.stringify(rootTags), Json.stringify(langs)))
      case None => NotFound(views.html.errors.e404())
    }
  }

}
