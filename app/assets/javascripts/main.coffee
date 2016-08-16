$ ->
  $('a[href="' + this.location.pathname + '"]').parents('li,ul').addClass('active')

@activateMenu = (id) ->
  $(id).addClass('active')

@keepTheRhythm = (selector) ->
  sel = selector || ".article-body img"
  $(sel).keepTheRhythm({
    baseLine: 24,
    spacing: "margin"
  })

$(window).load ->
  keepTheRhythm()

Array::filter = (func) -> x for x in @ when func(x)

app = angular.module 'barracudaApp', ['bw.paging', 'alloyeditor', 'ngTagsInput']
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

app.controller "NewsController", ($timeout, $window, $scope, $http) ->
  $scope.newsList = $window.newsList
  $scope.total = $scope.newsList.length
  $scope.page = 1
  $scope.pageSize = 10
  $scope.newsPage = $scope.newsList.slice(0, $scope.pageSize)
  $scope.showPage = (p) ->
    from = (p - 1) * $scope.pageSize
    $scope.newsPage = $scope.newsList.slice(from, from + $scope.pageSize);
    return false

app.controller "ArticleController", ($timeout, $window, $scope, $http) ->
  $scope.articleModel = angular.copy($window.articleModel)
  $scope.tags = angular.copy($window.tags)
  $scope.loadTags = (query) ->
    if(query.length == 0)
      return $scope.tags
    return $scope.tags.filter (x) -> x.toLowerCase().indexOf(query.toLowerCase()) != -1
  $scope.reset = ->
    $scope.articleModel = angular.copy($window.articleModel)