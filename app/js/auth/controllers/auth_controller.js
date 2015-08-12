'use strict';

module.exports = function(app) {
  app.controller('authController', ['$scope', '$location', '$cookies',  function($scope, $location, $cookies) {
    $scope.setCookie = function(input) {
      $scope.newCookie = null;
      $cookies.put(input.key, input.value);
    };

    $scope.getCookies = function() {
      $scope.cookies = $cookies.getAll(); 
    };

    $scope.whereAreWe = function() {
      return $location.path();
    };

    $scope.changePlaces = function() {
      $location.path('/notes');
    };
  }]);
};
