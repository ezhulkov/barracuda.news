$ ->
  $('a[href="' + this.location.pathname + '"]').parents('li,ul').addClass('active')

$(window).load ->
  $(".article-body img").keepTheRhythm({
    baseLine: 24,
    spacing: "margin"
  })

app = angular.module "barracudaApp", ["bw.paging"]
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
  $scope.menuOn = false
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
  $scope.toggleMenu = ->
    $scope.menuOn = !$scope.menuOn

app.controller "AdminController", ($timeout, $window, $scope, $http) ->
  $scope.news = $window.news
  $scope.total = $scope.news.length
  $scope.page = 1
  $scope.pageSize = 4
  $scope.newsPage = $scope.news.slice(0, $scope.pageSize)
  $scope.showPage = (p) ->
    from = (p - 1) * $scope.pageSize
    $scope.newsPage = $scope.news.slice(from, from + $scope.pageSize);
    return false