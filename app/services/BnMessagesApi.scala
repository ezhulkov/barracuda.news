package services

import javax.inject.Inject
import javax.inject.Singleton
import play.api.Configuration
import play.api.Environment
import play.api.i18n.DefaultMessagesApi
import play.api.i18n.Lang
import play.api.i18n.Langs
import play.api.i18n.Messages
import play.api.mvc.RequestHeader
import scala.language.implicitConversions

@Singleton
class BnMessagesApi @Inject()(environment: Environment, configuration: Configuration, langs: Langs) extends DefaultMessagesApi(environment, configuration, langs) {

  def resourceLang(request: RequestHeader) = request.getQueryString("lang").map(t => Lang(t)).getOrElse(LangUtils.defaultLang)
  override def preferred(request: RequestHeader): Messages = Messages(resourceLang(request), this)

}