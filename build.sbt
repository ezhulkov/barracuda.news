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
  "com.jsuereth" % "scala-arm_2.11" % "1.4",
  "com.github.nscala-time" %% "nscala-time" % "2.12.0",
  "org.webjars" % "webjars-play_2.11" % "2.5.0-2",
  "org.webjars.bower" % "angular" % "1.5.7",
  "org.webjars.bower" % "alloyeditor" % "1.2.3",
  "org.webjars.bower" % "ng-tags-input" % "3.1.1",
  "org.webjars.bower" % "angular-datepicker" % "2.0.3",
  "org.webjars.bower" % "moment" % "2.10.6",
  "org.webjars.bower" % "moment-timezone" % "0.4.1",
  "org.webjars" % "jquery" % "2.2.4",
  "org.webjars" % "font-awesome" % "4.6.3"
)

lazy val root = (project in file("."))
  .enablePlugins(PlayScala, UniversalPlugin, SbtWeb)
