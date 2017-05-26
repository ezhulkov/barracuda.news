@baseLine = 24

Array::filterArray = (func) -> x for x in @ when func(x)

cutImages = (parent)->
  $(".cut-images img", parent).each (i, e) ->
    h = $(e).height()
    if(h % baseLine != 0)
      $(e).closest("div").height(h - h % baseLine)

$(window).load ->
  path = this.location.pathname
  $('a[href="' + path + '"]').parents('li,ul').addClass('active')
  $('a[alt-href]').each (i, e) ->
    altHref = $(e).attr("alt-href")
    if(path.indexOf(altHref) != -1)
      $(e).parents('li,ul').addClass('active')
  $(".article-body img:not('.gallery-image'),.article-header img,.fotorama").keepTheRhythm({
    baseLine: baseLine,
    spacing: "margin"
  })
  cutImages(document)

frontendApp = angular.module 'frontendApp', []
adminApp = angular.module 'adminApp', ['bw.paging', 'alloyeditor', 'ngTagsInput', 'datePicker', 'localytics.directives', 'angularFileUpload']

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
  articleHeader = $("#page-header")
  articleHeaderTop = if articleHeader == undefined || articleHeader.offset() == undefined then undefined else articleHeader.offset().top
  $scope.searchOn = false
  $scope.menuOn = false
  $scope.langOn = false
  $scope.searchString = undefined
  $scope.emailString = undefined
  $scope.subscribeResult = undefined
  $scope.items = []
  $scope.subscribe = (url) ->
    $http.post(url, {email: $scope.emailString}).then ((rs) ->
      $scope.subscribeResult = rs
    ), (error)->
      $scope.subscribeResult = "error"
      console.log(error)
  $scope.search = (url) ->
    if($scope.searchString != undefined && $scope.searchString.length >= 2)
      $http.post(url + "?q=" + $scope.searchString).then (rs) ->
        $scope.items = rs.data
    else
      $scope.items = []
  $scope.closeArticle = ->
    window.location = "/"
  $scope.toggleSearch = ->
    $scope.searchOn = !$scope.searchOn
  $scope.toggleLang = ->
    $scope.langOn = !$scope.langOn
  $scope.toggleMenu = ->
    $scope.menuOn = !$scope.menuOn
  angular.element($window).bind "scroll", () ->
    if articleHeaderTop != undefined
      if this.pageYOffset >= articleHeaderTop then $("body").addClass("fixed-article-header") else $("body").removeClass("fixed-article-header")

adminApp.controller "LayoutsController", ($timeout, $window, $scope, $http) ->
  $scope.layouts = $window.layouts
  $scope.layoutsTagged = $scope.layouts.filterArray (item)-> item.tag != undefined
  $scope.layoutsUntagged = $scope.layouts.filterArray (item)-> item.tag == undefined
  $scope.hasUntagged = ()->
    $scope.layoutsUntagged != undefined && $scope.layoutsUntagged.length > 0

adminApp.controller "LayoutController", ($timeout, $window, $scope, $http) ->
  $scope.result = {}
  $scope.langs = angular.copy($window.langs)
  $scope.tags = angular.copy($window.tags)
  $scope.rootTags = angular.copy($window.rootTags)
  $scope.newsTypes = angular.copy($window.newsTypes)
  $scope.rowHeights = angular.copy($window.rowHeights)
  $scope.layoutModel = angular.copy($window.layoutModel)
  $scope.rowBlueprint = {
    height: "AUTO"
  }
  $scope.blockBlueprint = {
    newsType: "TEXT",
    tag: "main_news",
    captions: [
      {
        lang: "en"
      },
      {
        lang: "ru"
      }
    ]
  }
  $scope.row12Blueprint = angular.copy($scope.rowBlueprint)
  $scope.row66Blueprint = angular.copy($scope.rowBlueprint)
  $scope.row444Blueprint = angular.copy($scope.rowBlueprint)
  $scope.row48Blueprint = angular.copy($scope.rowBlueprint)
  $scope.row84Blueprint = angular.copy($scope.rowBlueprint)
  $scope.block4Blueprint = angular.copy($scope.blockBlueprint)
  $scope.block6Blueprint = angular.copy($scope.blockBlueprint)
  $scope.block8Blueprint = angular.copy($scope.blockBlueprint)
  $scope.block12Blueprint = angular.copy($scope.blockBlueprint)
  $scope.block4Blueprint.size = "SIZE4"
  $scope.block6Blueprint.size = "SIZE6"
  $scope.block8Blueprint.size = "SIZE8"
  $scope.block12Blueprint.size = "SIZE12"
  $scope.row12Blueprint.blocks = [angular.copy($scope.block12Blueprint)]
  $scope.row66Blueprint.blocks = [angular.copy($scope.block6Blueprint), angular.copy($scope.block6Blueprint)]
  $scope.row444Blueprint.blocks = [angular.copy($scope.block4Blueprint), angular.copy($scope.block4Blueprint), angular.copy($scope.block4Blueprint)]
  $scope.row48Blueprint.blocks = [angular.copy($scope.block4Blueprint), angular.copy($scope.block8Blueprint)]
  $scope.row84Blueprint.blocks = [angular.copy($scope.block8Blueprint), angular.copy($scope.block4Blueprint)]
  $scope.rowBlueprints = [$scope.row12Blueprint, $scope.row66Blueprint, $scope.row444Blueprint, $scope.row84Blueprint, $scope.row48Blueprint]
  if($scope.layoutModel.tag != undefined)
    $scope.layoutModel.tag.id = $scope.layoutModel.tag.id.toString()
  $scope.loading = false
  $scope.setRowType = (row, blueprint)->
    if(!$scope.rowBlueprintMatches(row, blueprint))
      index = $scope.layoutModel.config.rows.indexOf(row)
      $scope.layoutModel.config.rows[index].blocks = blueprint.blocks
      initRemodal()
  $scope.rowBlueprintMatches = (row, blueprint) ->
    if(blueprint.blocks.length != row.blocks.length)
      return false
    for i in [0...blueprint.blocks.length]
      if(blueprint.blocks[i].size != row.blocks[i].size)
        return false
    return true
  $scope.newLayout = $scope.layoutModel.id == undefined
  $scope.byLangCode = (code) ->
    (el) ->
      return el.lang == code
  $scope.loadTags = (query) ->
    if(query.length == 0)
      return $scope.tags
    return $scope.tags.filterArray (x) -> x.toLowerCase().indexOf(query.toLowerCase()) != -1
  initRemodal = () ->
    $timeout ->
      $('.remodal').remodal()
    , 10
  $scope.addRow = () ->
    newRow = angular.copy($scope.row12Blueprint)
    $scope.layoutModel.config = {
      rows: [newRow]
    }
    initRemodal()
  $scope.addRowBefore = (row) ->
    newRow = angular.copy($scope.row12Blueprint)
    index = $scope.layoutModel.config.rows.indexOf(row)
    $scope.layoutModel.config.rows.splice(index, 0, newRow)
    initRemodal()
  $scope.addRowAfter = (row) ->
    newRow = angular.copy($scope.row12Blueprint)
    index = $scope.layoutModel.config.rows.indexOf(row)
    $scope.layoutModel.config.rows.splice(index + 1, 0, newRow)
    initRemodal()
  $scope.hasRows = () ->
    $scope.layoutModel.config != undefined && $scope.layoutModel.config.rows != undefined && $scope.layoutModel.config.rows.length > 0
  $scope.deleteRow = (row) ->
    index = $scope.layoutModel.config.rows.indexOf(row)
    $scope.layoutModel.config.rows.splice(index, 1)
    if($scope.layoutModel.config.rows.length == 0)
      $scope.layoutModel.config.rows = undefined
  $scope.processResponse = (data) ->
    $scope.result = data
    if($scope.newLayout)
      $window.location.pathname = $window.location.pathname + "/" + data.layout_id
    else if($scope.layoutModel.id == undefined)
      $scope.layoutModel.id = data.layout_id
    $scope.loading = false
    $timeout ->
      $scope.result = {}
    , 1000
  $scope.save = ->
    $scope.loading = true
    layout = angular.copy($scope.layoutModel)
    if(layout.tag != undefined && layout.tag.id != undefined && layout.tag.id.length > 0)
      layout.tag.id = parseInt(layout.tag.id)
    else
      layout.tag = undefined
    $http.post("/admin/layout", layout).then (rs) ->
      $scope.processResponse(rs.data)
  $scope.delete = ->
    $http.delete("/admin/layout/" + $scope.layoutModel.id).tnen (rs) ->
      $window.location.pathname = data.redirect_url
adminApp.controller "NewsController", ($timeout, $window, $scope, $http) ->
  filterNews = () ->
    $scope.filteredNewsList = $scope.newsList.filterArray (x) -> $scope.searchStr == undefined || x.caption.toLowerCase().indexOf($scope.searchStr.toLowerCase()) != -1
    $scope.total = $scope.filteredNewsList.length
    $scope.page = 1
    $scope.pageSize = 25
    $scope.newsPage = $scope.filteredNewsList.slice(0, $scope.pageSize)
  $scope.searchStr = undefined
  $scope.newsList = $window.newsList
  filterNews()
  $scope.search = () ->
    filterNews()
  $scope.showPage = (p) ->
    from = (p - 1) * $scope.pageSize
    $scope.newsPage = $scope.filteredNewsList.slice(from, from + $scope.pageSize);
    return false

adminApp.controller "ArticleController", ($timeout, $window, $scope, $http, $location, FileUploader) ->
  moment.tz.add("Europe/Moscow|MSK MSD MSK|-30 -40 -40|01020|1BWn0 1qM0 WM0 8Hz0|16e6")
  $scope.result = {}
  $scope.langs = angular.copy($window.langs)
  $scope.selectedLang = $scope.langs[0]
  $scope.articleModel = angular.copy($window.articleModel)
  $scope.articleLinks = angular.copy($window.articleLinks)
  $scope.articleModel.publish_moment = moment($scope.articleModel.publish)
  $scope.tags = angular.copy($window.tags)
  $scope.alloyConfig = $window.alloyConfig
  $scope.loading = false
  $scope.newArticle = $scope.articleModel.id == undefined
  $scope.uploader = new FileUploader({
    url: "/admin/cover_photo"
  })
  $scope.uploader.onAfterAddingFile = (fileItem) ->
    file = document.getElementById("uploader").files[0]
    fileReader = new FileReader()
    fileReader.onload = (data) -> $scope.$apply -> $scope.translation.coverMedia = data.target.result
    fileReader.readAsDataURL(file)
    fileItem.url = "/admin/cover_photo/" + $scope.translation.id
    $scope.uploader.uploadAll()
  $scope.uploader.onSuccessItem = (fileItem, response, status, headers) ->
    $scope.processResponse(response)
  if($scope.articleModel.crossLinks != undefined)
    $scope.articleModel.crossLinks = $scope.articleModel.crossLinks.map (id)-> {id: id.toString()}
  $scope.findTranslation = () ->
    (t for t in $scope.articleModel.translations when t.lang is $scope.selectedLang.value)[0]
  $scope.deleteCover = (tr) ->
    $http.delete("/admin/cover_photo/" + tr.id).then (rs) ->
      tr.coverMedia = undefined
      $scope.processResponse(rs.data)
  $scope.translation = $scope.findTranslation()
  $scope.changeLang = ->
    $scope.translation = $scope.findTranslation()
  $scope.loadTags = (query) ->
    if(query.length == 0)
      return $scope.tags
    return $scope.tags.filterArray (x) -> x.toLowerCase().indexOf(query.toLowerCase()) != -1
  $scope.showCoverPhoto = ->
    $scope.articleHasId && $scope.articleModel.coverMedia != undefined
  $scope.articleHasId = ->
    $scope.articleModel.id != undefined
  $scope.processResponse = (data) ->
    $scope.result = data
    if($scope.newArticle)
      $window.location.pathname = $window.location.pathname + "/" + data.article_id
    else if($scope.articleModel.id == undefined)
      $scope.articleModel.id = data.article_id
    $scope.loading = false
    $timeout ->
      $scope.result = {}
    , 1000
  $scope.show = ->
    $window.open("http://barracuda.news/article/" + $scope.articleModel.shortUrl, "_blank")
    return true
  $scope.addLink = ->
    if($scope.articleModel.crossLinks == undefined)
      $scope.articleModel.crossLinks = []
    if(($scope.articleModel.crossLinks.find (s)-> s.id == 0) == undefined )
      $scope.articleModel.crossLinks.push({id: "0"})
  $scope.delLink = (link) ->
    item = $scope.articleModel.crossLinks.find (a)-> a.id == link.id
    index = $scope.articleModel.crossLinks.indexOf(item)
    $scope.articleModel.crossLinks.splice(index, 1)
    if $scope.articleModel.crossLinks.length == 0
      $scope.articleModel.crossLinks = undefined
  $scope.delete = ->
    $http.delete("/admin/article/" + $scope.articleModel.id).then (rs) ->
      $window.location.pathname = rs.data.redirect_url
  $scope.save = ->
    $scope.loading = true
    article = angular.copy($scope.articleModel)
    article.publish = article.publish_moment.valueOf()
    if(article.crossLinks != undefined)
      article.crossLinks = article.crossLinks.map (t)-> parseInt(t.id)
    $http.post("/admin/article", article).then (rs) ->
      $scope.processResponse(rs.data)
  $scope.hasCaption = (translation)->
    translation.caption != undefined && translation.caption.length > 0
