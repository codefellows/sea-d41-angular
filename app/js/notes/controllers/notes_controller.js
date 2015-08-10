'use strict';

module.exports = function(app) {
  app.controller('notesController', ['$scope', 'RESTResource', function($scope, resource) {
    $scope.notes = [];
    $scope.errors = [];
    var Note = new resource('notes');

    $scope.getAll = function() {
      Note.getAll(function(err, data) {
        if (err) return $scope.errors.push({msg: 'error getting notes'});
        $scope.notes = data;
      });
    };

    $scope.create = function(note) {
      $scope.newNote = null;
      Note.save(note, function(err, data) {
        if (err) return $scope.errors.push({msg: 'could note save note: ' + note.noteBody});
        $scope.notes.push(data);
      });
    };

    $scope.destroy = function(note) {
      Note.destroy(note, function(err, data) {
        if (err) return $scope.errors.push({msg: 'could not delete note: ' + note.noteBody});
        $scope.notes.splice($scope.notes.indexOf(note),1);
      });
    };

    $scope.update = function(note) {
      Note.update(note, function(err, data) {
        if (err) return $scope.errors.push({msg: 'could not update note: ' + note.noteBody});
        note.editing = false;
      });
    };
  }]);
};
