import javax.inject._
import models.CoreModels.Language
import play.api._
import play.api.http.DefaultHttpErrorHandler
import play.api.i18n.I18nSupport
import play.api.i18n.MessagesApi
import play.api.mvc.Results._
import play.api.mvc._
import play.api.routing.Router
import scala.concurrent._

@Singleton
class ErrorHandler @Inject()(
  env: Environment,
  config: Configuration,
  sourceMapper: OptionalSourceMapper,
  router: Provider[Router],
  val messagesApi: MessagesApi
) extends DefaultHttpErrorHandler(env, config, sourceMapper, router) with I18nSupport {

  implicit val lang = Language.DEFAULT

  override def onProdServerError(request: RequestHeader, exception: UsefulException) = Future.successful(
    InternalServerError(views.html.errors.e500("A server error occurred: " + exception.getMessage))
  )
  override def onNotFound(request: RequestHeader, message: String): Future[Result] = Future.successful(
    NotFound(views.html.errors.e404())
  )

}