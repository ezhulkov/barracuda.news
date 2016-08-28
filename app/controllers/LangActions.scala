package controllers

import jp.t2v.lab.play2.stackc.{RequestAttributeKey, RequestWithAttributes, StackableController}
import models.CoreModels.Language
import models.CoreModels.Language._
import org.apache.commons.lang3.StringUtils
import play.api.mvc.{Controller, Request, Result}
import scala.concurrent.Future
import scala.util.Try

/**
  * Created by ezhulkov on 28.08.16.
  */
trait LangActions extends StackableController {
  self: Controller =>

  implicit def resourceLang(implicit req: RequestWithAttributes[_]) = req.get(ResourceLang).get
  implicit def allLangs(implicit req: RequestWithAttributes[_]) = Language.values.toSeq

  case object ResourceLang extends RequestAttributeKey[LanguageValue]
  case object AllLangs extends RequestAttributeKey[Seq[LanguageValue]]
  override def proceed[A](request: RequestWithAttributes[A])(f: (RequestWithAttributes[A]) => Future[Result]): Future[Result] = {
    val resourceLang = getResourceLang(request).getOrElse(Language.DEFAULT)
    super.proceed(request
      .set(ResourceLang, Language.convert(resourceLang))
    )(f)
  }

  private def getResourceLang(request: Request[_]): Option[Language] = request.path.split("\\/").find(StringUtils.isNotEmpty).flatMap(tryParseLang)
  private def tryParseLang(lang: String): Option[Language] = Try(Language.withName(lang)).toOption

}
