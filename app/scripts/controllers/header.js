'use strict';

/**
 * @ngdoc function
 * @name getReadyNewApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the getReadyNewApp
 */
angular.module('getReadyNewApp')
    .controller('HeaderCtrl', function($scope, $location, userService, $rootScope, $anchorScroll) {
        this.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];

        $scope.isLoggedIn = true;
        $scope.isLoggedOut = true;
        $scope.isRegistered = true;


        var loginSessionData = userService.getSessionToken();

        if (loginSessionData !== undefined) {
            $rootScope.accType = loginSessionData.currentUser.accType;
        }

        $scope.toggled = function(open) {
            // $log.log('Dropdown is now: ', open);
        };
        $scope.getSeekerlink = function(accType) {
            // console.log(accType);
            $rootScope.accType = accType;
            
            if (loginSessionData !== undefined) {

                if ($rootScope.accType === accType) {
                    $location.path('/' + accType);
                } else {
                    $location.path('/login');
                }

            } else {
                $rootScope.accType = accType;
                $location.path('/login');
            }

        }

        $scope.dashboardLink = function(){
            if (loginSessionData !== undefined) {
               if ($rootScope.accType === 'seeker' || $rootScope.accType === 'interviewer') {
                    $location.path('/account');
                }else{
                    $location.path('/recruiter');
                } 
            }else{
                location.path('/');
            }
            
            
        }

        $scope.logout = function() {
            // console.log('logged out');
            userService.removeSessionToken();
            $location.path('/');
            $scope.isLoggedIn = true;
            $scope.isLoggedOut = true;
            $scope.showDashboard = false;
            $rootScope.accType = "";
            $scope.isRegistered = true;
            loginSessionData = undefined;
        }


        $scope.init = function() {

            var loginSessionData = userService.getSessionToken();
            // console.log(loginSessionData);
            if (loginSessionData !== undefined) {
                // console.log('header');
                $scope.isLoggedIn = false;
                $scope.isLoggedOut = false;
                $scope.isRegistered = false;
                $scope.showDashboard = true;
            }
        };

        $scope.init();

        $scope.scrollTo = function(id) {
            $location.hash(id);
            console.log($location.hash());
            $anchorScroll();
        };
    });