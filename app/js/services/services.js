'use strict';

var services = module.exports = exports = angular.module('services', []);

require('./rest_resource')(services);
