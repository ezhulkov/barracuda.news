package services

import org.apache.commons.lang3.StringUtils
import play.api.Logger
import scala.util.Failure
import scala.util.Try

/**
  * Created by ezhulkov on 18.08.16.
  */
object Utils {

  val symbolMap = Map(
    ' ' -> "-",
    '–' -> "-",
    '=' -> "-",
    '&' -> "n",
    '№' -> "N",
    'а' -> "a",
    'б' -> "b",
    'в' -> "v",
    'г' -> "g",
    'д' -> "d",
    'е' -> "e",
    'ё' -> "e",
    'ж' -> "zh",
    'з' -> "z",
    'и' -> "i",
    'й' -> "i",
    'к' -> "k",
    'л' -> "l",
    'м' -> "m",
    'н' -> "n",
    'о' -> "o",
    'п' -> "p",
    'р' -> "r",
    'с' -> "s",
    'т' -> "t",
    'у' -> "u",
    'ф' -> "f",
    'х' -> "h",
    'ц' -> "ts",
    'ч' -> "ch",
    'ш' -> "sh",
    'щ' -> "sch",
    'ь' -> "",
    'ы' -> "y",
    'ъ' -> "",
    'э' -> "e",
    'ю' -> "yu",
    'я' -> "ya",
    'a' -> "a",
    'b' -> "b",
    'c' -> "c",
    'd' -> "d",
    'e' -> "e",
    'f' -> "f",
    'g' -> "g",
    'h' -> "h",
    'i' -> "i",
    'j' -> "j",
    'k' -> "k",
    'l' -> "l",
    'm' -> "m",
    'n' -> "n",
    'o' -> "o",
    'p' -> "p",
    'q' -> "q",
    'r' -> "r",
    's' -> "s",
    't' -> "t",
    'u' -> "u",
    'v' -> "v",
    'w' -> "w",
    'x' -> "x",
    'y' -> "y",
    'z' -> "z",
    '0' -> "0",
    '1' -> "1",
    '2' -> "2",
    '3' -> "3",
    '4' -> "4",
    '5' -> "5",
    '6' -> "6",
    '7' -> "7",
    '8' -> "8",
    '9' -> "9"
  )

  def transliterate(text: String): String = {
    Option(text).map(_.toLowerCase.trim).filter(StringUtils.isNotEmpty).map { t =>
      val textChars: Array[Char] = t.toCharArray
      textChars.flatMap(ch => symbolMap.get(ch)).mkString.toLowerCase.trim.take(64)
    }.getOrElse(text)
  }

  def loggedFailure[T] (msg: String = ""): PartialFunction[Throwable, Try[T]] = {
    case th: Throwable =>
      Logger.error(msg, th)
      Failure(th)
  }

}
