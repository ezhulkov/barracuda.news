package controllers.stack

import jp.t2v.lab.play2.stackc.{RequestWithAttributes, StackableController}
import play.api.Logger
import play.api.mvc.{Controller, Result}
import scala.concurrent.Future

/**
  * Created by ezhulkov on 28.08.16.
  */
trait LoggingElement extends StackableController {
  self: Controller =>

  override def proceed[A](request: RequestWithAttributes[A])(f: (RequestWithAttributes[A]) => Future[Result]): Future[Result] = {
    Logger.info(s"${request.method} to ${request.path}")
    super.proceed(request)(f)
  }

}