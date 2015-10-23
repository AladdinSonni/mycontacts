'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('myContacts', [
  'ngRoute',
  'firebase',
  'myContacts.contacts'
]);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/contacts'});
}]);
