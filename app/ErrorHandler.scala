import javax.inject._
import play.api._
import play.api.http.DefaultHttpErrorHandler
import play.api.i18n.I18nSupport
import play.api.mvc.Results._
import play.api.mvc._
import play.api.routing.Router
import services.BnMessagesApi
import scala.concurrent._

@Singleton
class ErrorHandler @Inject()(
  implicit env: Environment,
  config: Configuration,
  sourceMapper: OptionalSourceMapper,
  router: Provider[Router],
  val messagesApi: BnMessagesApi
) extends DefaultHttpErrorHandler(env, config, sourceMapper, router) with I18nSupport {

  override def onProdServerError(request: RequestHeader, exception: UsefulException) = Future.successful{
    implicit val rq = request
    InternalServerError(views.html.errors.e500("A server error occurred: " + exception.getMessage))
  }
  override def onNotFound(request: RequestHeader, message: String): Future[Result] = Future.successful{
    implicit val rq = request
    NotFound(views.html.errors.e404())
  }
  override protected def onForbidden(request: RequestHeader, message: String): Future[Result] = Future.successful{
    implicit val rq = request
    NotFound(views.html.errors.e403())
  }
}