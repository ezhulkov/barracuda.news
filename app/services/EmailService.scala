package services

import javax.inject.Inject
import com.google.inject.ImplementedBy
import javax.inject.Singleton
import models.CoreModels.Subscribe
import org.apache.commons.lang3.StringUtils
import play.api.Logger
import play.api.http.Status
import play.api.i18n.Lang
import play.api.libs.json.Json
import play.api.libs.ws.WSAuthScheme
import play.api.libs.ws.WSClient
import scala.concurrent.Future
import scala.concurrent.duration.Duration
import scala.concurrent.duration.SECONDS

/**
  * Created by ezhulkov on 03/02/2017.
  */
@ImplementedBy(classOf[EmailServiceImpl])
trait EmailService {

  def subscribe(info: Subscribe)(implicit lang: Lang): Future[Int]

}

@Singleton
class EmailServiceImpl @Inject()(
  ws: WSClient
) extends EmailService {

  import scala.concurrent.ExecutionContext.Implicits.global

  val MC_SUB_ENDPOINT = "https://us13.api.mailchimp.com/3.0/lists/%s/members"
  val RUS_LIST        = "33280126dd"
  val INT_LIST        = "1c3fda29ec"
  val API_KEY         = "cc9eb7cb331b7f91d768d31342747d2a-us13"

  override def subscribe(info: Subscribe)(implicit lang: Lang): Future[Int] = info.email match {
    case Some(email) =>
      val listId = if (lang.code == "ru") RUS_LIST else INT_LIST
      val json = mcJsonBody(listId, email)
      val duration = Duration(1, SECONDS)
      ws.url(MC_SUB_ENDPOINT.format(listId))
        .withAuth("barracuda", API_KEY, WSAuthScheme.BASIC)
        .withFollowRedirects(true)
        .withRequestTimeout(duration)
        .post(json)
        .map{ response =>
          Logger.info(s"User ${info.email} mailchimp subscription, response: ${response.status}, ${response.body}")
          response.status
        }
    case _ => Future.successful(Status.BAD_REQUEST)
  }

  private def mcJsonBody(listId: String, email: String)(implicit lang: Lang) = {
    Json.stringify(Json.obj(
      "email_address" -> email,
      "status" -> "subscribed",
      "language" -> lang.code
    ))
  }

}
