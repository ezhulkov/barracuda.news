package controllers.actions

import play.api.Logger
import play.api.mvc._
import scala.concurrent.Future

/**
  * Created by ezhulkov on 23.03.16.
  */
object LoggingAction extends ActionBuilder[Request] {
  override def invokeBlock[A](request: Request[A], block: (Request[A]) => Future[Result]): Future[Result] = {
    Logger.info(s"${request.method} to ${request.path}")
    block(request)
  }
}