package controllers.refiners

import models.CoreModels.Language
import models.CoreModels.Language.Language
import play.api.Logger
import play.api.mvc._
import scala.concurrent.Future
import org.apache.commons.lang3._
import scala.util.{Failure, Try}

/**
  * Created by ezhulkov on 21.08.16.
  */

sealed case class LangInfo(resourceLang: Language = Language.DEFAULT, clientLang: Language = Language.DEFAULT) {
  val allLangs = Language.values
}
sealed case class LangRequest[A](langInfo: LangInfo, request: Request[A]) extends WrappedRequest[A](request)

object LangAction extends ActionBuilder[LangRequest] with ActionRefiner[Request, LangRequest] {

  import scala.concurrent.ExecutionContext.Implicits.global

  override protected def refine[A](request: Request[A]): Future[Either[Result, LangRequest[A]]] = Future {
    val clientLang = getClientLang(request).getOrElse(Language.DEFAULT)
    val resourceLang = getResourceLang(request).getOrElse(Language.DEFAULT)
    Right(LangRequest(LangInfo(resourceLang, clientLang), request))
  }

  private def getClientLang(request: Request[_]): Option[Language] = request.cookies.get("lang").map(_.value).flatMap(tryParseLang)
  private def getResourceLang(request: Request[_]): Option[Language] = request.path.split("\\/").find(StringUtils.isNotEmpty).flatMap(tryParseLang)
  private def tryParseLang(lang: String): Option[Language] = Try(Language.withName(lang)).toOption


}
