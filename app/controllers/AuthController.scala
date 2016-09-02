package controllers

import javax.inject._
import controllers.stack.{LoggingElement, TokenValidateElement}
import jp.t2v.lab.play2.auth.LoginLogout
import models.Account
import play.api.i18n.{I18nSupport, MessagesApi}
import play.api.mvc._
import scala.concurrent.Future

@Singleton
class AuthController @Inject()(
  val messagesApi: MessagesApi
) extends Controller with LoginLogout with BnAuthConfig with I18nSupport with LoggingElement {

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

  def login = AsyncStack { implicit request =>
    Future(Ok(views.html.login(loginForm)))
  }

  def logout = AsyncStack { implicit request =>
    gotoLogoutSucceeded
  }

  def authenticate = AsyncStack { implicit request =>
    loginForm.bindFromRequest.fold(
      formWithErrors => Future.successful(Ok(views.html.login(formWithErrors))),
      user => gotoLoginSucceeded(user.get.name)
    )
  }

}