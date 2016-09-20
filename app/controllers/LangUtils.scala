package controllers

import models.CoreModels.Language
import models.CoreModels.Language.LanguageValue
import play.api.Environment
import play.api.Mode
import play.api.mvc.Call
import play.api.mvc.RequestHeader
import play.twirl.api.Html

/**
  * Created by ezhulkov on 19.09.16.
  */
object LangUtils {

  def addLang(url: String, qs: Option[String] = None)(implicit env: Environment, lang: LanguageValue): String = {
    val langCode = lang match {
      case Language.DEFAULT => None
      case _ => Some(lang)
    }
    env.mode match {
      case Mode.Prod => langCode.map(t => s"${t.code}/$url${qs.map(q => "?" + q).getOrElse("")}").getOrElse(url)
      case _ => langCode.map(t => s"$url?lang=${t.code}${qs.map(q => "&" + q).getOrElse("")}").getOrElse(url)
    }
  }

  def addLang(url: Call)(implicit env: Environment, lang: LanguageValue): String = addLang(url.toString)
  def addLang(request: RequestHeader)(implicit env: Environment, lang: LanguageValue): String = addLang(request.path, Option(request.rawQueryString))

  def ru(body: Html)(implicit lang: LanguageValue): Html = ifLang(body, Language.RUSSIAN)
  def en(body: Html)(implicit lang: LanguageValue): Html = ifLang(body, Language.ENGLISH)

  def ifLang(body: Html, desiredLang: LanguageValue)(implicit lang: LanguageValue): Html = {
    if (lang == desiredLang) body
    else Html("")
  }

  implicit class LangCall(url: Call) {
    def withLang(implicit env: Environment, lang: LanguageValue): String = addLang(url)
  }

}
