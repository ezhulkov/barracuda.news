import java.util.Base64
import java.util.regex.Pattern
import com.google.inject.Injector
import org.scalatestplus.play.OneAppPerSuite
import org.scalatestplus.play.PlaySpec
import play.api.Logger
import services.Mappers

/**
  * Created by ezhulkov on 14.09.16.
  */
class ImageTest extends PlaySpec with OneAppPerSuite {

  val injector = app.injector.instanceOf(classOf[Injector])

  "Regexp must" must {
    "Find all matches" in {
      val text = Mappers.Translation.findById(65L).flatMap(t => t.text).orNull
      val imgPattern = Pattern.compile("""<img\s*src=("data.*?base64,.*?")""")
      val b64Pattern = Pattern.compile(""".*?base64,(.*)""")
      val imgMatcher = imgPattern.matcher(text)
      val out = new StringBuffer()
      while (imgMatcher.find()) {
        if (imgMatcher.groupCount() == 1) {
          val data = imgMatcher.group(1)
          val b64Matcher = b64Pattern.matcher(data)
          if (b64Matcher.find()) {
            val base64Data = b64Matcher.group(1)
            val bytes = Base64.getDecoder.decode(base64Data)
            imgMatcher.appendReplacement(out, s"""<img src="${base64Data.length}"/>""")
          }
        }
      }
      val result = imgMatcher.appendTail(out).toString
      Logger.info(result)
    }
  }

}
