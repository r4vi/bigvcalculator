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
  }]);
