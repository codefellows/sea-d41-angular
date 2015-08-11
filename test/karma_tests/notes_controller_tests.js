'use strict';
require('../../app/js/client.js');
require('angular-mocks');

describe('notes controller', function() {
  var $ControllerConstructor;
  var $httpBackend;
  var $scope;

  beforeEach(angular.mock.module('notesApp'));

  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    $scope = $rootScope.$new();
    $ControllerConstructor = $controller;
  }));

  it('should be able to create a controller', function() {
    var notesController = $ControllerConstructor('notesController', {$scope: $scope});
    expect(typeof notesController).toBe('object');
    expect(typeof $scope.getAll).toBe('function');
    expect(Array.isArray($scope.notes)).toBe(true);
  });

  describe('REST functionality', function() {
    beforeEach(angular.mock.inject(function(_$httpBackend_, $rootScope) {
      $httpBackend = _$httpBackend_;
      $scope = $rootScope.$new();
      $ControllerConstructor('notesController', {$scope: $scope});
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should make a get request when getAll is called', function() {
      $httpBackend.expectGET('/api/notes').respond(200, [{noteBody: 'test note', _id: 1}]);
      $scope.getAll();
      $httpBackend.flush();
      expect($scope.notes.length).toBe(1);
      expect($scope.notes[0].noteBody).toBe('test note');
      expect($scope.notes[0]._id).toBe(1);
    });

    it('sould make a post request when create is called', function() {
      var testNote = {noteBody: 'test note'};
      $scope.newNote = testNote;
      expect($scope.notes.length).toBe(0);
      $httpBackend.expectPOST('/api/notes', testNote).respond(200, {noteBody: 'test create note', _id: 1});
      $scope.create(testNote);
      expect($scope.newNote).toBe(null);
      $httpBackend.flush();
      expect($scope.notes.length).toBe(1);
      expect($scope.notes[0].noteBody).toBe('test create note');
    });

    it('should make a put request when update is called', function() {
      var note = {_id: 1, editing: true};
      $httpBackend.expectPUT('/api/notes/1', note).respond(200);
      $scope.update(note);
      $httpBackend.flush();
      expect(note.editing).toBe(false);
    });

    it('should make a delete request when destroy is called', function() {
      var note = {_id: 1, noteBody: 'test note'};
      $scope.notes = [{noteBody: 'some note', _id: 2}, note, {noteBody: 'another test note', _id: 3}];
      $httpBackend.expectDELETE('/api/notes/1').respond(200);
      $scope.destroy(note);
      $httpBackend.flush();
      expect($scope.notes.length).toBe(2);
      expect($scope.notes.indexOf(note)).toBe(-1);
      expect($scope.notes[0].noteBody).toBe('some note');
      expect($scope.notes[1].noteBody).toBe('another test note');
    }); 
  });
});
