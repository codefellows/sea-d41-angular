'use strict';

module.exports = function(app) {
  app.directive('dummyDirective', function() {
    return {
      restrict: 'CA',
      replace: true,
      template: '<section><h2>{{anotherVar}}: {{greeting}}</h2><input type="text" data-ng-model="greeting"></section>',
      scope: {
        greeting: '=',
        anotherVar: '@'
      },
      controller: function($scope) {
        $scope.greeting = $scope.greeting || 'Carpe yolo';
      }
    };
  });
};
