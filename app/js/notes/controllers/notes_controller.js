'use strict';

module.exports = function(app) {
  app.controller('notesController', ['$scope', '$http', function($scope, $http) {
    $scope.notes = [];
    $scope.errors = [];

    $scope.getAll = function() {
      $http.get('/api/notes')
        .then(function(res) {
          //succcess
          $scope.notes = res.data;
        }, function(res) {
          //error
          $scope.errors.push({msg: 'could not retrieve notes from server'});
          console.log(res.data);
        });
    };

    $scope.create = function(note) {
      $scope.newNote = null;
      $http.post('/api/notes', note)
        .then(function(res) {
          $scope.notes.push(res.data);
        }, function(res) {
          console.log(res.data);
          $scope.errors.push(res.data);
        });
    };

    $scope.destroy = function(note) {
      $http.delete('/api/notes/' + note._id)
        .then(function(res) {
          $scope.notes.splice($scope.notes.indexOf(note),1);
        }, function(res) {
          console.log(res.data);
          $scope.errors.push(res.data);
        });
    };

    $scope.update = function(note) {
      $http.put('/api/notes/' + note._id, note)
        .then(function(res) {
          note.editing = false;
        }, function(res) {
          note.editing = false; 
          console.log(res.data);
        });
    };
  }]);
};
