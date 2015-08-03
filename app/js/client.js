'use strict';

require('angular/angular');

var notesApp = angular.module('notesApp', []);

var notesController = notesApp.controller('notesController', ['$scope', function($scope) {
  $scope.greeting = 'hello world';
  $scope.alertGreeting = function() {
    alert($scope.greeting);
  };
}]);

var anotherController = notesApp.controller('anotherController', ['$scope', function($scope) {
  $scope.anotherValue = 'some other value';
}]);
