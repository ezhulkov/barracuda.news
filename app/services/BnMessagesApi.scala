package services

import javax.inject.Inject
import javax.inject.Singleton
import com.google.inject.ImplementedBy
import controllers.stack.LangElement
import models.CoreModels.Language
import play.api.Configuration
import play.api.Environment
import play.api.i18n.DefaultMessagesApi
import play.api.i18n.Lang
import play.api.i18n.Langs
import play.api.i18n.Messages
import play.api.i18n.MessagesApi
import play.api.mvc.RequestHeader

/**
  * Created by ezhulkov on 20.09.16.
  */
@ImplementedBy(classOf[BnMessagesApiImpl])
trait BnMessagesApi extends MessagesApi {

}

@Singleton
class BnMessagesApiImpl @Inject()(environment: Environment, configuration: Configuration, langs: Langs) extends DefaultMessagesApi(environment, configuration, langs) with BnMessagesApi {
  self: LangElement =>

  override def preferred(request: RequestHeader): Messages = {
    val maybeLangFromUrl = request.getQueryString("lang").map(t => Lang(t)).orElse(Some(Language.DEFAULT.playLang))
    val lang = langs.preferred(maybeLangFromUrl.toSeq ++ request.acceptLanguages)
    Messages(lang, this)
  }

}
