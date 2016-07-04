name := """barracuda.news"""
version := "1.0-SNAPSHOT"
scalaVersion := "2.11.7"
scalacOptions ++= Seq("-feature", "-language", "postfixOps")

routesGenerator := InjectedRoutesGenerator

dependencyOverrides ++= Set(
  "org.scala-lang" % "scala-compiler" % scalaVersion.value
)

libraryDependencies ++= Seq(
  evolutions,
  jdbc,
  cache,
  ws,
  "com.jsuereth" % "scala-arm_2.11" % "1.4",
  "com.github.nscala-time" %% "nscala-time" % "2.12.0"
)

lazy val root = (project in file("."))
  .enablePlugins(PlayScala, UniversalPlugin)
