$ ->
  $('a[href="' + this.location.pathname + '"]').parents('li,ul').addClass('active')

$(window).load ->
  $(".article-body img").keepTheRhythm({
    baseLine: 24,
    spacing: "margin"
  })

app = angular.module "barracudaApp", []
app.controller "MainController", ($timeout, $window, $scope, $http) ->
  $scope.closeArticle = ->
    window.location = "/"
