package utils

import java.util.concurrent.TimeUnit
import com.typesafe.config.{Config, ConfigFactory, ConfigObject}
import scala.concurrent.duration.{Duration, FiniteDuration}
import scala.util.Try

/**
  * Created by ezhulkov on 27.08.16.
  */
object Configuration {

  import collection.JavaConverters._

  val configuration: Config = ConfigFactory.load

  def getConfigs(path: String): Option[ConfigObject] = Try(configuration.getObject(path)).toOption
  def getValue[T](path: String): Option[T] = Try(configuration.getAnyRef(path).asInstanceOf[T]).toOption
  def getList[T](path: String): List[T] = Try(configuration.getAnyRefList(path).asScala.toList.asInstanceOf[List[T]]).toOption.getOrElse(Nil)
  def getDuration(path: String): Option[Duration] = Try(configuration.getDuration(path)).toOption.map(t => FiniteDuration(t.toMillis, TimeUnit.MILLISECONDS))

}
