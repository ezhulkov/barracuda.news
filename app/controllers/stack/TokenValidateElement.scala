package controllers.stack

import jp.t2v.lab.play2.stackc.{RequestWithAttributes, StackableController}
import play.api.data.Form
import play.api.data.Forms._
import play.api.mvc.{Controller, Request, Result}
import scala.concurrent.Future

/**
  * Created by ezhulkov on 28.08.16.
  */
trait TokenValidateElement extends StackableController {
  self: Controller =>

  private val tokenForm = Form("token" -> text)

  override def proceed[A](request: RequestWithAttributes[A])(f: RequestWithAttributes[A] => Future[Result]): Future[Result] = {
    if (validateToken(request)) super.proceed(request)(f)
    else Future.successful(BadRequest)
  }

  private def validateToken(request: Request[_]): Boolean = {
    val comparison = for {
      tokenInForm <- tokenForm.bindFromRequest()(request).value
      tokenInSession <- request.session.get("token")
    } yield request.method != "POST" || tokenInForm == tokenInSession
    comparison.getOrElse(false)
  }

}
