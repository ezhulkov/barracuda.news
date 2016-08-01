name := """barracuda.news"""
version := "1.0-SNAPSHOT"
scalaVersion := "2.11.7"
scalacOptions ++= Seq("-feature", "-language", "postfixOps")

routesGenerator := InjectedRoutesGenerator

dependencyOverrides ++= Set(
  "org.scala-lang" % "scala-compiler" % scalaVersion.value,
  "org.webjars" % "jquery" % "2.2.4",
  "com.google.guava" % "guava" % "19.0"
)

libraryDependencies ++= Seq(
  evolutions,
  jdbc,
  cache,
  ws,
  "com.jsuereth" % "scala-arm_2.11" % "1.4",
  "com.github.nscala-time" %% "nscala-time" % "2.12.0",
  "org.webjars" % "webjars-play_2.11" % "2.5.0-2",
  "org.webjars.bower" % "compass-mixins" % "1.0.2",
  "org.webjars.bower" % "angular" % "1.5.7",
  "org.webjars" % "jquery" % "2.2.4",
  "org.webjars" % "bootstrap" % "3.3.6",
  "org.webjars" % "font-awesome" % "4.6.3"
)

lazy val root = (project in file("."))
  .enablePlugins(PlayScala, UniversalPlugin, SbtWeb)
