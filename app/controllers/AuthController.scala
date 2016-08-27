package controllers

import javax.inject._
import jp.t2v.lab.play2.auth.LoginLogout
import models.Account
import play.api.Logger
import play.api.i18n.{I18nSupport, MessagesApi}
import play.api.mvc._
import scala.concurrent.Future

@Singleton
class AuthController @Inject()(
  val messagesApi: MessagesApi
) extends Controller with LoginLogout with BnAuthConfig with I18nSupport {

  import play.api.data.Forms._
  import play.api.data._
  import scala.concurrent.ExecutionContext.Implicits.global

  val loginForm = Form {
    mapping(
      "login" -> nonEmptyText,
      "password" -> nonEmptyText
    )(Account.authenticate)(_.map(u => (u.name, "")))
      .verifying("Invalid email or password", result => result.isDefined)
  }

  def login = Action { implicit request =>
    Ok(views.html.login(loginForm))
  }

  def logout = Action.async { implicit request =>
    gotoLogoutSucceeded
  }

  def authenticate = Action.async { implicit request =>
    loginForm.bindFromRequest.fold(
      formWithErrors => Future.successful(BadRequest(views.html.login(formWithErrors))),
      user => gotoLoginSucceeded(user.get.name)
    )
  }

}
