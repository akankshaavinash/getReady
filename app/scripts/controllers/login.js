'use strict';

/**
 * @ngdoc function
 * @name getReadyNewApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the getReadyNewApp
 */
angular.module('getReadyNewApp')
  .controller('LoginCtrl', function ($scope, $cookies, $rootScope, $location, userService) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    var login = this;
   
    login.login = function(loginData){
    	loginData.accType = $rootScope.accType;
    	if (loginData.password === '') {
	        return false;
	      }
	      if (loginData.userId === '') {
	        return false;
	      }

	      userService.login(loginData).then(function(data){
	      	// console.log(data[0].password);
	      	// console.log('entered password', loginData.password);
	      	if (data[0].password === loginData.password) {
	      		userService.setSessionToken(data[0].email_id, data[0].acc_type);
	      		if (data[0].acc_type === 'recruiter') {
	      				$location.path('/recruiter');
	      		}else{
	      				$location.path('/seeker');
	      		}
	      		
	      	}else{
	      		console.log('Password does not match.......');
	      	}
	      	
	      });

    };
  });
