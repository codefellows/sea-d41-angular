'use strict';

module.exports = function(app) {
  app.directive('noteFormDirective', function() {
    return {
      restrict: 'AC',
      replace: true,
      templateUrl: '/js/notes/templates/note_form_template.html',
      scope: {
        save: '&',
        buttonText: '=',
        labelText: '=',
        note: '='
      },
      controller: function($scope) {
        if (!$scope.labelText) $scope.labelText = 'Note:';
        if (!$scope.buttonText) $scope.buttonText = 'Save Note'; 
      }
    };
  });
};
