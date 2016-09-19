package controllers.stack

import jp.t2v.lab.play2.stackc.RequestWithAttributes
import jp.t2v.lab.play2.stackc.StackableController
import play.api.Logger
import play.api.mvc.Controller
import play.api.mvc.Result
import scala.concurrent.Future

/**
  * Created by ezhulkov on 28.08.16.
  */
trait LoggingElement extends StackableController {
  self: Controller =>

  override def proceed[A](request: RequestWithAttributes[A])(f: (RequestWithAttributes[A]) => Future[Result]): Future[Result] = {
    Logger.info(request.toString)
    super.proceed(request)(f)
  }

}