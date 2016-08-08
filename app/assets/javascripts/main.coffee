$ ->
  $('a[href="' + this.location.pathname + '"]').parents('li,ul').addClass('active')

$(window).load ->
  $(".article-body img").keepTheRhythm({
    baseLine: 24,
    spacing: "margin"
  })

app = angular.module "barracudaApp", []
app.directive "autoFocus", ($timeout) ->
  return link: (scope, element, attrs) ->
    attrs.$observe("autoFocus", (newValue) ->
      if (newValue == "true")
        $timeout(()->
          element[0].focus()
        )
    )
app.filter "rawHtml", ($sce) ->
  (text) ->
    return $sce.trustAsHtml(text)

app.controller "MainController", ($timeout, $window, $scope, $http) ->
  $scope.searchOn = false
  $scope.searchString = undefined
  $scope.items = []
  $scope.search = ->
    if($scope.searchString != undefined && $scope.searchString.length >= 2)
      $http.post("/search?q=" + $scope.searchString)
      .success (data) ->
        $scope.items = data
    else
      $scope.items = []
  $scope.closeArticle = ->
    window.location = "/"
  $scope.toggleSearch = ->
    $scope.searchOn = !$scope.searchOn