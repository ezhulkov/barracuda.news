import com.google.inject.AbstractModule
import scalikejdbc.config.DBs

/**
  * Created by ezhulkov on 19.08.16.
  */
class Module extends AbstractModule {

  DBs.setupAll()

  override def configure(): Unit = {

  }

}
