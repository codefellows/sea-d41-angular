'use strict';

require('angular/angular');
require('angular-route');
require('angular-cookies');
require('./services/services');
require('./directives/directives');

var notesApp = angular.module('notesApp', ['services', 'directives', 'ngRoute', 'ngCookies']);

require('./notes/notes')(notesApp);
require('./auth/auth')(notesApp);

notesApp.config(['$routeProvider', function($route) {
  $route
    .when('/notes', {
      templateUrl: '/js/notes/templates/index_view.html',
      controller: 'notesController'
    })
    .when('/auth', {
      templateUrl: '/js/auth/templates/demo.html',
      controller: 'authController'
    })
    .otherwise({
      redirectTo: '/notes'
    });
}]);
