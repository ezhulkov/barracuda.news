$ ->
  $('a[href="' + this.location.pathname + '"]').parents('li,ul').addClass('active')

@activateMenu = (id) ->
  $(id).addClass('active')

$(window).load ->
  $(".article-body img").keepTheRhythm({
    baseLine: 24,
    spacing: "margin"
  })

Array::filter = (func) -> x for x in @ when func(x)

if (typeof AlloyEditor != 'undefined')
  @alloyConfig = {
    toolbars: {
      add: {
        buttons: ['image', 'link']
      },
      styles: {
        selections: [{
          name: 'link',
          buttons: ['linkEdit'],
          test: AlloyEditor.SelectionTest.link
        }, {
          name: 'text',
          buttons2: ['styles', 'bold', 'italic', 'underline', 'link'],
          buttons: [{
            name: 'styles',
            cfg: {
              styles: [
                {
                  name: 'Heading',
                  style: {element: 'h2'}
                },
                {
                  name: 'Heading small',
                  style: {element: 'h3'}
                },
                {
                  name: 'Interview question',
                  style: {
                    element: 'p',
                    attributes: {
                      class: 'q'
                    }
                  }
                },
                {
                  name: 'Interview answer',
                  style: {
                    element: 'p',
                    attributes: {
                      class: 'a'
                    }
                  }
                }
              ]
            }
          }, 'bold', 'italic', 'underline', 'link'],
          test: AlloyEditor.SelectionTest.text
        }, {
          name: 'table',
          buttons: ['tableRow', 'tableColumn', 'tableCell', 'tableRemove'],
          getArrowBoxClasses: AlloyEditor.SelectionGetArrowBoxClasses.table,
          setPosition: AlloyEditor.SelectionSetPosition.table,
          test: AlloyEditor.SelectionTest.table
        }]
      }
    }
  }

frontendApp = angular.module 'frontendApp', []
adminApp = angular.module 'adminApp', ['bw.paging', 'alloyeditor', 'ngTagsInput', 'datePicker']

adminApp.service "fileUpload", ($http) ->
  this.uploadFileToUrl = (file, uploadUrl, success, error) ->
    fd = new FormData();
    fd.append('file', file);
    $http.post(uploadUrl, fd, {
      transformRequest: angular.identity,
      headers: {'Content-Type': undefined}
    })
    .success(success)
    .error(error)

frontendApp.directive "autoFocus", ($timeout) ->
  return link: (scope, element, attrs) ->
    attrs.$observe("autoFocus", (newValue) ->
      if (newValue == "true")
        $timeout(()->
          element[0].focus()
        )
    )
frontendApp.filter "rawHtml", ($sce) ->
  (text) ->
    return $sce.trustAsHtml(text)

frontendApp.controller "FrontendController", ($timeout, $window, $scope, $http) ->
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

adminApp.controller "NewsController", ($timeout, $window, $scope, $http) ->
  $scope.newsList = $window.newsList
  $scope.total = $scope.newsList.length
  $scope.page = 1
  $scope.pageSize = 10
  $scope.newsPage = $scope.newsList.slice(0, $scope.pageSize)
  $scope.showPage = (p) ->
    from = (p - 1) * $scope.pageSize
    $scope.newsPage = $scope.newsList.slice(from, from + $scope.pageSize);
    return false
  $scope.addArticle = () ->
    $http.post("/admin/article")
    .error (data, status) ->
      $scope.result = data
      $scope.loading = false
      $timeout ->
        $scope.result = {}
      , 2000
    .success (data) ->
      $scope.result = data
      $scope.loading = false
      $timeout ->
        $scope.result = {}
      , 2000

adminApp.controller "ArticleController", ($timeout, $window, $scope, $http, fileUpload) ->
  moment.tz.add("Europe/Moscow|MSK MSD MSK|-30 -40 -40|01020|1BWn0 1qM0 WM0 8Hz0|16e6")
  $scope.result = {}
  $scope.langs = angular.copy($window.langs)
  $scope.selectedLang = $scope.langs[0]
  $scope.articleModel = angular.copy($window.articleModel)
  $scope.tags = angular.copy($window.tags)
  $scope.alloyConfig = $window.alloyConfig
  $scope.loading = false
  $scope.findTranslation = () ->
    (t for t in $scope.articleModel.translations when t.lang is $scope.selectedLang.value)[0]
  $scope.translation = $scope.findTranslation()
  $scope.changeLang = ->
    $scope.translation = $scope.findTranslation()
  $scope.loadTags = (query) ->
    if(query.length == 0)
      return $scope.tags
    return $scope.tags.filter (x) -> x.toLowerCase().indexOf(query.toLowerCase()) != -1
  $scope.save = ->
    $scope.loading = true
    article = angular.copy($scope.articleModel)
    $http.post("/admin/article", article)
    .error (data, status) ->
      $scope.result = data
      $scope.loading = false
      $timeout ->
        $scope.result = {}
      , 2000
    .success (data) ->
      $scope.result = data
      $scope.loading = false
      $timeout ->
        $scope.result = {}
      , 2000
