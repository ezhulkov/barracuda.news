$ ->
  $('a[href="' + this.location.pathname + '"]').parents('li,ul').addClass('active')
  fitTopicHeight()
  $(window).resize () ->
    fitTopicHeight()


fitTopicHeight = () ->
  $('.topic-col').each (index, topic) ->
    if(window.innerWidth >= 992)
      $(topic).css('height', $(topic).closest('.topic-row').height() - 20)
    else
      $(topic).css('height', 'initial')


app = angular.module "barracudaApp", []