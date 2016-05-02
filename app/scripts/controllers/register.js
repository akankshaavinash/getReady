'use strict';

/**
 * @ngdoc function
 * @name getReadyNewApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the getReadyNewApp
 */
angular.module('getReadyNewApp')
  .controller('RegisterCtrl', function ( $scope, seeker, userService, $timeout) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

   	var reg = this;



    reg.register = function(user) {
    	// body...
    	
    	// console.log(user);
      userService.register(user).then(function(data){
        $scope.alerts = [{type: 'success', msg: 'You are successfully registered'}];
        $scope.autoHide();
        user.name = "";
        user.phone = "";
        user.accType = "";
        user.email = "";
        user.password = "";
        user.confPassword = "";
      });
    }


    function getSeeker(){
      seeker.seekerInfo().then(function (data){
        console.log(data);
      });
    }

    getSeeker();

    $scope.autoHide = function(){
      $timeout(function(){
        $scope.alerts.splice(0,1);
      },4000);
    };
    $scope.hideAlert = function(index) {
      $scope.alerts.splice(index, 1);
    };


  });
