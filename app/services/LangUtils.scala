package services

import play.api.Environment
import play.api.Mode
import play.api.i18n.Lang
import play.api.mvc.Call
import play.api.mvc.RequestHeader
import play.twirl.api.Html
import utils.Configuration

/**
  * Created by ezhulkov on 19.09.16.
  */
object LangUtils {

  val langs       = Configuration.getList[String]("play.i18n.langs").map(l => Lang(l))
  val defaultLang = langs.headOption.getOrElse(Lang("en"))

  def addLang(url: String, qs: Map[String, Seq[String]] = Map.empty)(implicit env: Environment, lang: Lang): String = {
    val qsString = Option(qs.filter{ case (name, values) => name != "lang" }.map{ case (name, vals) => s"$name=${vals.headOption.getOrElse("")}" }.mkString("&")).filter(_.nonEmpty)
    val langCode = lang match {
      case LangUtils.defaultLang => None
      case _ => Some(lang)
    }
    env.mode match {
      case Mode.Prod => langCode.map(t => s"/${t.code}$url${qsString.map(q => "?" + q).getOrElse("")}").getOrElse(url)
      case _ =>
        val newQs = (langCode.map(l => s"lang=${l.code}") ++ qsString).mkString("&")
        if (newQs.nonEmpty) s"$url?$newQs" else url
    }
  }

  def addLang(url: Call)(implicit env: Environment, lang: Lang): String = addLang(url.toString)
  def addLang(request: RequestHeader)(implicit env: Environment, lang: Lang): String = addLang(request.path, request.queryString)

  def ru(body: Html)(implicit lang: Lang): Html = ifLang(body, Lang("ru"))
  def en(body: Html)(implicit lang: Lang): Html = ifLang(body, Lang("en"))

  def ifLang(body: => Html, desiredLang: Lang)(implicit lang: Lang): Html = {
    if (lang == desiredLang) body
    else Html("")
  }

  implicit class LangCall(url: Call) {
    def withLang(implicit env: Environment, lang: Lang): String = addLang(url)
  }

}
