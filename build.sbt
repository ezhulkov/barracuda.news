name := """barracuda.news"""
version := "1.0-SNAPSHOT"
scalaVersion := "2.11.7"
scalacOptions ++= Seq("-feature", "-language", "postfixOps")

routesGenerator := InjectedRoutesGenerator

dependencyOverrides ++= Set(
  "org.scala-lang" % "scala-compiler" % scalaVersion.value,
  "org.webjars" % "jquery" % "2.2.4",
  "com.google.guava" % "guava" % "19.0",
  "org.webjars.bower" % "moment" % "2.10.6",
  "org.webjars.bower" % "moment-timezone" % "0.4.1"
)


libraryDependencies ++= Seq(
  evolutions,
  jdbc,
  cache,
  ws,
  play.sbt.Play.autoImport.cache,
  "ch.qos.logback" % "logback-classic" % "1.1.7",
  "ch.qos.logback" % "logback-core" % "1.1.7",
  "jp.t2v" %% "play2-auth" % "0.14.2",
  "jp.t2v" %% "stackable-controller" % "0.5.1",
  "net.coobird" % "thumbnailator" % "0.4.8",
  "org.mindrot" % "jbcrypt" % "0.3m",
  "com.jsuereth" % "scala-arm_2.11" % "1.4",
  "com.github.nscala-time" %% "nscala-time" % "2.12.0",
  "org.skinny-framework" %% "skinny-orm" % "2.2.0",
  "org.scalikejdbc" %% "scalikejdbc-play-initializer" % "2.5.1",
  "org.postgresql" % "postgresql" % "9.4.1209",
  "org.apache.commons" % "commons-io" % "1.3.2",
  "org.apache.commons" % "commons-lang3" % "3.4",
  "org.scalatestplus.play" %% "scalatestplus-play" % "1.5.0-RC1" % Test,
  "org.webjars" % "webjars-play_2.11" % "2.5.0-2",
  "org.webjars.bower" % "angular" % "1.5.7",
  "org.webjars.bower" % "alloyeditor" % "1.2.3",
  "org.webjars.bower" % "ng-tags-input" % "3.1.1",
  "org.webjars.bower" % "angular-datepicker" % "2.0.3",
  "org.webjars.bower" % "moment" % "2.10.6",
  "org.webjars.bower" % "moment-timezone" % "0.4.1",
  "org.webjars.bower" % "jquery-cookie" % "1.4.1",
  "org.webjars.bower" % "chosen" % "1.4.2",
  "org.webjars.bower" % "remodal" % "1.1.0",
  "org.webjars.bower" % "github-com-nervgh-angular-file-upload" % "v2.3.4",
  "org.webjars.npm" % "angular-chosen-localytics" % "1.4.0",
  "org.webjars" % "jquery" % "2.2.4",
  "org.webjars" % "font-awesome" % "4.6.3"
)

TwirlKeys.templateImports ++= Seq(
  "org.joda.time._",
  "components._",
  "play.api.Environment",
  "services.LangUtils._",
  "play.api.mvc._",
  "models.CoreModels._",
  "play.api.i18n._",
  "models.Implicits._"
)

lazy val root = (project in file("."))
  .enablePlugins(PlayScala, UniversalPlugin, SbtWeb)
  .disablePlugins(PlayLogback)
