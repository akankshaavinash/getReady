'use strict';

/**
 * @ngdoc function
 * @name getReadyNewApp.controller:VacancyCtrl
 * @description
 * # VacancyCtrl
 * Controller of the getReadyNewApp
 */
angular.module('getReadyNewApp')
    .controller('VacancyCtrl', function($scope, userService, uiCalendarConfig, $uibModal) {
        this.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];

        var loginSessionData = userService.getSessionToken();
        // console.log(loginSessionData.currentUser.email);

        userService.vacancyList().then(function(data) {
            // console.log(data);
            $scope.totalVacancyList = data;
        });
        userService.getAppliedJobList().then(function(data) {
            console.log(data);
            $scope.appliedJobList = data;
        });
        
        $scope.applyForJob = function(skill, companyCode, index) {
            // console.log(skill, companyCode, index);
            userService.applyForJob(skill, loginSessionData.currentUser.email, companyCode).then(function(data) {
                // console.log(data);
                data.companyCode = companyCode;
                data.skill = skill;
                var modalInstance = $uibModal.open({
                    templateUrl: 'views/modals/recruiterJobseekerList.html',
                    controller: 'RecruiterjobseekerlistCtrl',
                    windowClass: 'roundedModal',
                    resolve: {
                        items: function() {
                            return data;
                        }
                    }
                });
            });

            // modalInstance.result.then(function (data) {

            // });

            // console.log(companyCode, index);
        }
    });