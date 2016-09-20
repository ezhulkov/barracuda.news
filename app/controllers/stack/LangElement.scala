package controllers.stack

import jp.t2v.lab.play2.stackc.RequestAttributeKey
import jp.t2v.lab.play2.stackc.RequestWithAttributes
import jp.t2v.lab.play2.stackc.StackableController
import models.CoreModels.Language
import models.CoreModels.Language._
import play.api.i18n.I18nSupport
import play.api.mvc.Controller
import play.api.mvc.Request
import play.api.mvc.Result
import scala.concurrent.Future
import scala.util.Try

/**
  * Created by ezhulkov on 28.08.16.
  */
trait LangElement extends StackableController {
  self: Controller with I18nSupport =>

  implicit def resourceLang(implicit req: RequestWithAttributes[_]) = req.get(ResourceLang).get

  case object ResourceLang extends RequestAttributeKey[LanguageValue]

  override def proceed[A](request: RequestWithAttributes[A])(f: (RequestWithAttributes[A]) => Future[Result]): Future[Result] = {
    val resourceLang = getResourceLang(request).getOrElse(Language.DEFAULT)
    super.proceed(request.set(
      ResourceLang, Language.convert(resourceLang)
    ))(f)
  }

  private def getResourceLang(request: Request[_]): Option[Language] = request.getQueryString("lang").flatMap(t => tryParseLang(t))
  private def tryParseLang(lang: String): Option[Language] = Try(Language.withName(lang)).toOption

}