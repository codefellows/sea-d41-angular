'use strict';

require('angular/angular');
require('./services/services');
require('./directives/directives');

var notesApp = angular.module('notesApp', ['services', 'directives']);

require('./notes/notes')(notesApp);
