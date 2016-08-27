package controllers

import models.{Account, Role}
import scala.reflect.{ClassTag, classTag}
import jp.t2v.lab.play2.auth._
import scala.concurrent.{ExecutionContext, Future}

/**
  * Created by ezhulkov on 27.08.16.
  * See info https://github.com/t2v/play2-auth
  */
trait BnAuthConfig extends AuthConfig {

  type Id = String
  type User = Account
  type Authority = Role

  val idTag                  : ClassTag[Id] = classTag[Id]
  val sessionTimeoutInSeconds: Int          = 3600

  def resolveUser(id: Id)(implicit ctx: ExecutionContext): Future[Option[User]] = Future.successful(Account.findByName(""))

}
