import com.google.inject.AbstractModule
import play.api.i18n.DefaultLangs
import play.api.i18n.Langs
import play.api.i18n.MessagesApi
import scalikejdbc.config.DBs
import services.BnMessagesApi

/**
  * Created by ezhulkov on 19.08.16.
  */
class Module extends AbstractModule {

  DBs.setupAll()

  override def configure() = {
    bind(classOf[Langs]).to(classOf[DefaultLangs])
    bind(classOf[MessagesApi]).to(classOf[BnMessagesApi])
  }

}
