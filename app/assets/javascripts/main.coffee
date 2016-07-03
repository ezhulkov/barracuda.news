$ ->
  $('a[href="' + this.location.pathname + '"]').parents('li,ul').addClass('active')

app = angular.module "barracudaApp", []