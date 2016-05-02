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
    'ngTouch',
    'ui.bootstrap'
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
        controller: 'AccountCtrl',
        controllerAs: 'account'
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
        controllerAs: 'reg'
      })
      .when('/account',{
        templateUrl: 'views/account.html',
        controller: 'AccountCtrl',
        controllerAs: 'account'
      })
      .when('/profile',{
        templateUrl: 'views/profile.html',
        controller: 'ProfileCtrl',
        controllerAs: 'profile'
      })
      .when('/jobs', {
        templateUrl: 'views/jobList.html',
        controller:'JobslistCtrl',
        controllerAs: 'jobs'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
