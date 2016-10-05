$ ->
  $('a[href="' + this.location.pathname + '"]').parents('li,ul').addClass('active')

@baseLine = 24

@activateMenu = (id) ->
  $(id).addClass('active')

$(window).load ->
  $(".article-body img,.article-header img").keepTheRhythm({
    baseLine: baseLine,
    spacing: "margin"
  })
  $(".cut-images img").each (i, e)->
    h = $(e).height()
    if(h % baseLine != 0)
      $(e).closest(".photo").height(h - h % baseLine)

Array::filter = (func) -> x for x in @ when func(x)

if (typeof AlloyEditor != 'undefined')
  @alloyConfig = {
    toolbars: {
      add: {
        buttons: ['image', 'link', 'table', 'embed']
      },
      styles: {
        selections: [{
          name: 'link',
          buttons: ['linkEdit'],
          test: AlloyEditor.SelectionTest.link
        }, {
          name: 'text',
          buttons: [{
            name: 'styles',
            cfg: {
              styles: [
                {
                  name: 'Normal text',
                  style: {element: 'p'}
                },
                {
                  name: 'Heading',
                  style: {element: 'h2'}
                },
                {
                  name: 'Heading small',
                  style: {element: 'h3'}
                },
                {
                  name: 'Photo caption',
                  style: {
                    element: 'p',
                    attributes: {
                      class: 'photo-caption'
                    }
                  }
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
          }, 'bold', 'italic', 'underline', 'link', 'ul', 'ol', 'paragraphLeft', 'paragraphCenter', 'paragraphRight', 'paragraphJustify', 'removeFormat'],
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
adminApp = angular.module 'adminApp', ['bw.paging', 'alloyeditor', 'ngTagsInput', 'datePicker', 'localytics.directives', 'angularFileUpload']

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

adminApp.controller "LayoutsController", ($timeout, $window, $scope, $http) ->
  $scope.layouts = $window.layouts
  $scope.layoutsTagged = $scope.layouts.filter (item)-> item.tag != undefined
  $scope.layoutsUntagged = $scope.layouts.filter (item)-> item.tag == undefined
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
    return $scope.tags.filter (x) -> x.toLowerCase().indexOf(query.toLowerCase()) != -1
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
    $http.post("/admin/layout", layout)
    .error (data, status) ->
      $scope.processResponse(data)
    .success (data) ->
      $scope.processResponse(data)
  $scope.delete = ->
    $http.delete("/admin/layout/" + $scope.layoutModel.id)
    .error (data, status) ->
      console.log("error")
    .success (data) ->
      $window.location.pathname = data.redirect_url

adminApp.controller "NewsController", ($timeout, $window, $scope, $http) ->
  $scope.newsList = $window.newsList
  $scope.total = $scope.newsList.length
  $scope.page = 1
  $scope.pageSize = 50
  $scope.newsPage = $scope.newsList.slice(0, $scope.pageSize)
  $scope.showPage = (p) ->
    from = (p - 1) * $scope.pageSize
    $scope.newsPage = $scope.newsList.slice(from, from + $scope.pageSize);
    return false

adminApp.controller "ArticleController", ($timeout, $window, $scope, $http, $location, FileUploader) ->
  moment.tz.add("Europe/Moscow|MSK MSD MSK|-30 -40 -40|01020|1BWn0 1qM0 WM0 8Hz0|16e6")
  CKEDITOR.DEFAULT_AE_EMBED_URL_TPL = '//iframe.ly/api/oembed?url={url}&callback={callback}&api_key=70ef4f2a4a266b31fc44b5';
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
    url: "/admin/cover_photo/" + $scope.articleModel.id
  })
  $scope.uploader.onAfterAddingFile = (fileItem) ->
    file = document.getElementById("uploader").files[0]
    fileReader = new FileReader()
    fileReader.onload = (data) ->
      $scope.$apply ->
        $scope.articleModel.coverMedia = data.target.result
    fileReader.readAsDataURL(file)
    $scope.uploader.uploadAll()
  $scope.uploader.onSuccessItem = (fileItem, response, status, headers) ->
    $scope.processResponse(response)
  if($scope.articleModel.crossLinks != undefined)
    $scope.articleModel.crossLinks = $scope.articleModel.crossLinks.map (id)-> {id: id.toString()}
  $scope.findTranslation = () ->
    (t for t in $scope.articleModel.translations when t.lang is $scope.selectedLang.value)[0]
  $scope.translation = $scope.findTranslation()
  $scope.changeLang = ->
    $scope.translation = $scope.findTranslation()
  $scope.loadTags = (query) ->
    if(query.length == 0)
      return $scope.tags
    return $scope.tags.filter (x) -> x.toLowerCase().indexOf(query.toLowerCase()) != -1
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
    $window.open("http://barracuda.news/article/" + $scope.articleModel.id, "_blank")
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
    $http.delete("/admin/article/" + $scope.articleModel.id)
    .error (data, status) ->
      console.log("error")
    .success (data) ->
      $window.location.pathname = data.redirect_url
  $scope.save = ->
    $scope.loading = true
    article = angular.copy($scope.articleModel)
    article.publish = article.publish_moment.valueOf()
    if(article.crossLinks != undefined)
      article.crossLinks = article.crossLinks.map (t)-> parseInt(t.id)
    $http.post("/admin/article", article)
    .error (data, status) ->
      $scope.processResponse(data)
    .success (data) ->
      $scope.processResponse(data)
  $scope.hasCaption = (translation)->
    translation.caption != undefined && translation.caption.length > 0
