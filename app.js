'use strict';

// Declare app level module which depends on views, and core components
angular.module('myApp', [
  'ngRoute',
  'firebase',
  'myApp.contacts',
  'myApp.version',
]).
config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({
    redirectTo: '/contacts'
  });
}]);


//Angular Initializiation
var config = {
  apiKey: "AIzaSyAEhrusHwKF8Rt00sGrJdOh4RhXHLwwdnc",
  authDomain: "angularjsapp-bffd2.firebaseapp.com",
  databaseURL: "https://angularjsapp-bffd2.firebaseio.com",
  projectId: "angularjsapp-bffd2",
  storageBucket: "angularjsapp-bffd2.appspot.com",
  messagingSenderId: "595174560134",
  appId: "1:595174560134:web:1a5c173236a32423"
};

firebase.initializeApp(config);