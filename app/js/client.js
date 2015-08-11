'use strict';

require('angular/angular');

var notesApp = angular.module('notesApp', []);

require('./notes/notes')(notesApp);
