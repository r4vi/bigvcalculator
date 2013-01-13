'use strict';

var bigvioCalculatorApp = angular.module('bigvioCalculatorApp', [])
  .config(['$routeProvider', function($routeProvider) {
      $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]).directive('bigvTooltip',function(){
      return function(scope,element,attrs) {
          $(element).tooltip();
      }
  });

bigvioCalculatorApp.directive('bigvPolyfill', function(){
    return function(scope,element,attrs) {
          $(element).updatePolyfill();
    }
  });
