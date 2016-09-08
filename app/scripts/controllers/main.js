'use strict';

/**
 * @ngdoc function
 * @name getReadyNewApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the getReadyNewApp
 */
angular.module('getReadyNewApp')
    .controller('MainCtrl', function($scope, $cookies, $rootScope, $location, userService) {
        this.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];

        $scope.isLoggedIn = true;
        $scope.isRegistered = true;

        $scope.interviewer = false;
        var main = 'this';
        // console.log('Get Cookie', userService.getSessionToken());

        var loginSessionData = userService.getSessionToken();
        if (loginSessionData !== undefined) {
            $rootScope.accType = loginSessionData.currentUser.accType;
        }
        
        $scope.getSeekerlink = function(accType) {
            console.log(accType);

           if (loginSessionData !== undefined) {

                if ($rootScope.accType === accType) {
                       $location.path('/'+accType);
                }else{
                    $location.path('/login');
                }
             
           }else{
                $rootScope.accType = accType;
                $location.path('/login');
           }
            
        }

        $scope.init = function() {
           
            if (loginSessionData !== undefined) {
                $scope.isLoggedIn = false;
                $scope.isRegistered = false;
            }
        }
        $scope.init();
    });