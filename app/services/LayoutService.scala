package services

import javax.inject.Singleton
import com.google.inject.ImplementedBy
import models.CoreModels.Layout
import scalikejdbc.DB
import scala.util.Try

/**
  * Created by ezhulkov on 22/09/2016.
  */
@ImplementedBy(classOf[LayoutServiceImpl])
trait LayoutService {

  def allLayouts: Seq[Layout]
  def findLayout(id: Long): Option[Layout]
  def findByTag(tag: String): Option[Layout]
  def deleteLayout(id: Long)
  def saveLayout(layout: Layout): Try[Long]

}

@Singleton
class LayoutServiceImpl extends LayoutService {

  override def allLayouts: Seq[Layout] = Mappers.Layout.findAll
  override def findLayout(id: Long): Option[Layout] = Mappers.Layout.findById(id)
  override def findByTag(tag: String): Option[Layout] = Mappers.Layout.findByTag(tag)
  override def deleteLayout(id: Long): Unit = Mappers.Layout.deleteById(id)
  override def saveLayout(layout: Layout): Try[Long] = DB.autoCommit { implicit session =>
    layout.id match {
      case Some(id) => Mappers.Layout.update(layout).map(count => id)
      case _ => Mappers.Layout.create(layout)
    }
  }

}