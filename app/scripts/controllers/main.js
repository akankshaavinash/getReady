'use strict';

/**
 * @ngdoc function
 * @name getReadyNewApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the getReadyNewApp
 */
angular.module('getReadyNewApp')
  .controller('MainCtrl', function ($scope, $location, userService) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.logout = function(){
    	userService.removeSessionToken();
        $location.path('/');
    }

  });
