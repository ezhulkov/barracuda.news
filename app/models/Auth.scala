package models

import com.typesafe.config.{ConfigValue, ConfigValueType}
import org.mindrot.jbcrypt.BCrypt
import utils.Configuration
import scala.language.implicitConversions

/**
  * Created by ezhulkov on 27.08.16.
  */

case class Account(name: String, password: String, role: Role)
object Account {

  import collection.JavaConversions._
  import collection.JavaConverters._

  val users = Configuration.getConfigs("auth.users").map(t => t.asScala.map { case (name, info) => Account.of(name, info) }.toSet).getOrElse(Nil)

  def of(name: String, info: ConfigValue) = {
    def rte = throw new RuntimeException("bad configuration")
    val map = info.valueType match {
      case ConfigValueType.OBJECT => info.unwrapped.asInstanceOf[java.util.Map[String, String]].toMap
      case _ => rte
    }
    Account(name, map.getOrElse("password_encrypted", rte), Role.withName(map.getOrElse("role", rte)))
  }

  def findByName(name: String): Option[Account] = users.find(t => t.name == name)
  def authenticate(login: String, password: String): Option[Account] = findByName(login).filter(a => BCrypt.checkpw(password, a.password))

}


sealed trait Role
object Role extends Enumeration {
  val Administrator = RoleValue("ADMIN")
  val Editor        = RoleValue("EDITOR")
  val Analyst       = RoleValue("ANALYST")
  val User          = RoleValue("USER")
  sealed case class RoleValue(code: String) extends super.Val(code) with Role
  implicit def convert(value: Value): RoleValue = value.asInstanceOf[RoleValue]
}