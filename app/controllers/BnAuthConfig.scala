package controllers

import models.{Account, Role}
import scala.reflect.{ClassTag, classTag}
import jp.t2v.lab.play2.auth._
import play.api.Logger
import play.api.mvc.{RequestHeader, Result, Results}
import scala.concurrent.{ExecutionContext, Future}
import play.api.mvc.Results._
import utils.Configuration

/**
  * Created by ezhulkov on 27.08.16.
  * See info https://github.com/t2v/play2-auth
  */
trait BnAuthConfig extends AuthConfig {

  type Id = String
  type User = Account
  type Authority = Role

  val idTag                  : ClassTag[Id] = classTag[Id]
  val sessionTimeoutInSeconds: Int          = 3600

  def resolveUser(id: Id)(implicit ctx: ExecutionContext): Future[Option[User]] = Future.successful(Account.findByName(id))
  def loginSucceeded(request: RequestHeader)(implicit ctx: ExecutionContext): Future[Result] = {
    Logger.info("Logged in")
    Future.successful(Redirect(routes.AdminController.index()))
  }
  def logoutSucceeded(request: RequestHeader)(implicit ctx: ExecutionContext): Future[Result] = {
    Logger.info("Logged out")
    Future.successful(Redirect(routes.FrontendController.index()))
  }
  def authenticationFailed(request: RequestHeader)(implicit ctx: ExecutionContext): Future[Result] = {
    Logger.info("Authentication failed")
    Future.successful {
      request.headers.get("X-Requested-With") match {
        case Some("XMLHttpRequest") => Unauthorized("Authentication failed")
        case _ => Redirect(routes.AuthController.login())
      }
    }
  }
  def authorizationFailed(request: RequestHeader, user: User, authority: Option[Authority])(implicit context: ExecutionContext): Future[Result] = {
    Logger.info("Authorization failed")
    Future.successful(Forbidden("no permission"))
  }
  def authorize(user: User, authority: Authority)(implicit ctx: ExecutionContext): Future[Boolean] = Future.successful {
    (user.role, authority) match {
      case (Role.Administrator, _) => true
      case (Role.Editor, _) => true
      case (Role.User, Role.User) => true
      case (Role.Analyst, Role.Analyst) => true
      case _ => false
    }
  }
  override lazy val tokenAccessor: TokenAccessor = new CookieTokenAccessor(
    cookieDomainOption = Configuration.getValue("auth.domain")
  )

}
