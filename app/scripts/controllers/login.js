'use strict';

/**
 * @ngdoc function
 * @name getReadyNewApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the getReadyNewApp
 */
angular.module('getReadyNewApp')
  .controller('LoginCtrl', function ($scope, $cookies, $location, userService) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    var login = this;
    login.login = function(loginData){
    	if (loginData.password === '') {
	        return false;
	      }
	      if (loginData.userId === '') {
	        return false;
	      }

	      userService.login(loginData).then(function(data){
	      	console.log(data.Items[0]);
	      	if (data.Items[0].password === loginData.password) {
	      		userService.setSessionToken(data.ssotoken);
	      		$location.path('/seeker');
	      	}else{
	      		console.log('Password does not match.......');
	      	}
	      	
	      });

    };
  });
