package views.formdata

import models.NewsModel.{NewsMedia, PeaceOfNews}

/**
  * Created by ezhulkov on 13.08.16.
  */
case class ArticleFormData(caption: String, text: String, publishDate: java.util.Date, tags: String, media: Option[NewsMedia])

object ArticleFormData {
  def from(news: PeaceOfNews) = ArticleFormData(news.caption.orNull, news.text, null, news.tags.mkString(","), news.media.map(t => t.head))
  def to(data: ArticleFormData) = PeaceOfNews(Option(data.caption), data.text, data.publishDate.getTime, data.tags.split(",").toSeq, Option(data.media.toSeq))
}
