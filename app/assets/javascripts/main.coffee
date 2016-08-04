$ ->
  $('a[href="' + this.location.pathname + '"]').parents('li,ul').addClass('active')
  fitTopicHeight()
  $(window).resize () ->
    fitTopicHeight()

$(window).load ->
  $("article img").keepTheRhythm({
    baseLine: 24
  })

fitTopicHeight = () ->
#  $('.topic-col').each (index, topic) ->
#    if(window.innerWidth >= 960)
#      $(topic).css('height', $(topic).closest('.topic-row').height())
#    else
#      $(topic).css('height', 'initial')


app = angular.module "barracudaApp", []