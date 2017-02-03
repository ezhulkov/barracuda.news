package services

import com.google.inject.ImplementedBy
import javax.inject.Singleton
import models.CoreModels.Subscribe
import org.apache.commons.lang3.StringUtils
import play.api.i18n.Lang
import play.api.libs.json.Json
import scala.concurrent.Future

/**
  * Created by ezhulkov on 03/02/2017.
  */
@ImplementedBy(classOf[EmailServiceImpl])
trait EmailService {

  def subscribe(info: Subscribe)(implicit lang: Lang): Future[Int]

}

@Singleton
class EmailServiceImpl extends EmailService {

  import scala.concurrent.ExecutionContext.Implicits.global

  val MC_SUB_ENDPOINT = "https://us11.api.mailchimp.com/2.0/lists/subscribe"
  val RUS_LIST        = "218833"
  val INT_LIST        = "218817"
  val API_KEY         = "cc9eb7cb331b7f91d768d31342747d2a-us13"

  override def subscribe(info: Subscribe)(implicit lang: Lang): Future[Int] = Future{
    if (StringUtils.isEmpty(info.email)) 400 else {
      val listId = if (lang.code == "ru") RUS_LIST else INT_LIST
      val json = mcJsonBody(listId, info.email)
      200
    }
  }

  private def mcJsonBody(listId: String, email: String) = {
    Json.stringify(Json.obj(
      "apikey" -> API_KEY,
      "id" -> listId,
      "email" -> Json.obj(
        "email" -> email,
        "euid" -> email,
        "luid" -> email
      )
    ))
  }

}
