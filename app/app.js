'use strict';

// Declare app level module which depends on views, and components
angular.module('contactApp', [
  'ngRoute',
  'firebase',
  'contactApp.contacts'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/contacts'});
}]);
