'use strict';

/**
 * @ngdoc function
 * @name getReadyNewApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the getReadyNewApp
 */
angular.module('getReadyNewApp')
    .controller('HeaderCtrl', function($scope, $location, userService,  $rootScope) {
        this.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];
        
        $scope.isLoggedIn = true;
        $scope.isLoggedOut = true;
        $scope.isRegistered = true;
        
        $scope.logout = function() {
            // console.log('logged out');
            userService.removeSessionToken();
            $location.path('/');
            $scope.isLoggedIn = true;
            $scope.isLoggedOut = true;
            $rootScope.accType = "";
        }


        $scope.init = function() {
            
            var loginSessionData = userService.getSessionToken();
            // console.log(loginSessionData);
            if (loginSessionData !== undefined) {
                // console.log('header');
                $scope.isLoggedIn = false;
                $scope.isLoggedOut = false;
            } 
        };

        $scope.init();
    });