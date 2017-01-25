package controllers.stack

import java.net.InetAddress
import java.util.zip.GZIPInputStream
import com.maxmind.db.CHMCache
import com.maxmind.geoip2.DatabaseReader
import jp.t2v.lab.play2.stackc.RequestWithAttributes
import jp.t2v.lab.play2.stackc.StackableController
import org.apache.commons.lang3.StringUtils
import org.slf4j.MDC
import play.api.Environment
import play.api.Logger
import play.api.Play
import play.api.i18n.Lang
import play.api.i18n.MessagesApi
import play.api.mvc.Controller
import play.api.mvc.Cookie
import play.api.mvc.Result
import resource.managed
import services.LangUtils
import utils.Configuration
import scala.concurrent.Future
import scala.util.Success
import scala.util.Try

/**
  * Created by ezhulkov on 28.08.16.
  */
trait LangRedirectElement extends StackableController {
  self: Controller =>

  import scala.concurrent.ExecutionContext.Implicits.global

  implicit val env        : Environment
  implicit val messagesApi: MessagesApi

  val avoidUrls  = Seq("/topic", "/article")
  val langs      = Configuration.getList[String]("play.i18n.langs")
  val ipDbFile   = Configuration.getValue[String]("maxmind.file").getOrElse("maxmind/GeoLite2-Country.mmdb.gz")
  val ipDbReader = env.resourceAsStream(ipDbFile).flatMap{ res =>
    managed(res)
      .flatMap(is => managed(new GZIPInputStream(is)))
      .map(zis => new DatabaseReader.Builder(zis).withCache(new CHMCache()).build())
      .opt
  }.get

  def findCountryByIp(ip: String): Option[String] = {
    if (StringUtils.isEmpty(ip) || "127.0.0.1".equals(ip)) return None
    val firstIp = ip.split("[:,\\s]")(0).trim
    val address = InetAddress.getByName(firstIp)
    Try(ipDbReader.country(address).getCountry.getIsoCode.toLowerCase) match {
      case Success(c) => Some(c)
      case _ =>
        Logger.error(s"Error getting country by ip $ip")
        None
    }
  }

  override def proceed[A](request: RequestWithAttributes[A])(f: (RequestWithAttributes[A]) => Future[Result]): Future[Result] = {
    val url = request.uri.toLowerCase
    val ip = request.getQueryString("ip").orElse(request.headers.get("X-Real-IP")).getOrElse(request.remoteAddress)
    val country = findCountryByIp(ip)
    val lang = messagesApi.preferred(request).lang.code
    val bot = request.headers.get("User-Agent").exists(t => t.toLowerCase.contains("bot"))
    MDC.put("region", List(Some(ip).map(t => s"ip:${t.toUpperCase}"), country.map(t => s"country:${t.toUpperCase}"), Some(lang).map(t => s"lang:${t.toUpperCase}")).flatten.mkString("/"))
    country match {
      case Some(c) if !bot && !c.equalsIgnoreCase(lang) && langs.contains(c.toLowerCase) && request.cookies.get("explicit_lang").isEmpty && !avoidUrls.exists(u => url.contains(u)) =>
        implicit val newLang = Lang(c)
        val url = LangUtils.addLang(request)
        Logger.info(s"Preferred lang detected (rq lang '$lang', country '$c'), Redirecting to $url")
        Future(Redirect(url).withCookies(Cookie("explicit_lang", "true")))
      case _ => super.proceed(request)(f)
    }
  }

}