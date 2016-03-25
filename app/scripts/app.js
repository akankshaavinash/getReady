'use strict';

/**
 * @ngdoc overview
 * @name getReadyNewApp
 * @description
 * # getReadyNewApp
 *
 * Main module of the application.
 */
angular
  .module('getReadyNewApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/seeker', {
        templateUrl: 'views/seeker.html',
        controller: 'SeekerCtrl',
        controllerAs: 'seek'
      })
      .when('/interviewer', {
        templateUrl: 'views/interviewer.html',
        controller: 'InterviewerCtrl',
        controllerAs: 'interview'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
      .when('/register', {
        templateUrl: 'views/register.html',
        controller: 'RegisterCtrl',
        controllerAs: 'register'
      })
      .when('/account',{
        templateUrl: 'views/account.html',
        controller: 'AccountCtrl',
        controllerAs: 'account'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
