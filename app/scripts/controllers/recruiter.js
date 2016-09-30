'use strict';

/**
 * @ngdoc function
 * @name getReadyNewApp.controller:RecruiterCtrl
 * @description
 * # RecruiterCtrl
 * Controller of the getReadyNewApp
 */
angular.module('getReadyNewApp')
    .controller('RecruiterCtrl', function($scope, seeker, userService, $uibModal) {
        this.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];

        var loginSessionData = userService.getSessionToken();
        // console.log(loginSessionData);
        $scope.jobseekerListData = [];
        if (loginSessionData !== undefined) {
            seeker.getRecruiterData(loginSessionData.currentUser.email).then(function(data) {
                // console.log(data);
                var jobseekerList = [];
                for (var i = 0; i < data.length; i++) {
                    jobseekerList[i] = data[i].jobseeker_emailid;

                    seeker.getJobseekersInfo(data[i].jobseeker_emailid).then(function(candidateData) {
                      // console.log(candidateData[0]);

                      userService.getCandidateInterviewList(candidateData[0].email_id).then(function(interviewData){
                        // console.log(interviewData);
                        if (interviewData.length === 0 ) {
                          // console.log('empty');
                          candidateData[0].isInterviewSet = true;
                          // $scope.isInterviewSet = false;
                        }else{
                          // $scope.isInterviewSet = true;
                           candidateData[0].isInterviewSet = false;
                           candidateData[0].date = interviewData[0].date;
                           candidateData[0].time = new Date(interviewData[0].start);
                        }
                      });
                        $scope.jobseekerListData.push(candidateData[0]);
                        // console.log($scope.jobseekerListData);
                    });
                    
                }

            });
        }


        $scope.searchJobSeeker = function() {
            // console.log($scope.searchSeeker);
            seeker.getJobseekersInfo($scope.searchSeeker).then(function(data) {
                // console.log(data.length);
                if (data.length !== 0) {
                    $scope.regSeeker = data[0].email_id + " is registered.";
                    $scope.showaddseeker = true;
                } else {
                    $scope.regSeeker = "Seeker not found";
                    $scope.showaddseeker = false;
                }

            });
        };

        $scope.addJobSeeker = function() {
            userService.addJobseekerToRecruiter(loginSessionData.currentUser.email, $scope.searchSeeker).then(function(data) {
                console.log("seeker added.....");
            });
        };

        $scope.addEvent = function(index) {
            console.log(index);
            var modalInstance = $uibModal.open({
                templateUrl: 'views/modals/interviewReq.html',
                controller: 'InterviewreqCtrl',
                windowClass: 'roundedModal',
                resolve: {
                    items: function() {
                        return $scope.events;
                    }
                }
            });
            modalInstance.result.then(function(data) {
              
              var loginSessionData = userService.getSessionToken();
              var interviewSetupData = {};
              
                interviewSetupData.jobseeker_email_id = $scope.jobseekerListData[index].email_id;
                interviewSetupData.interviewer_email_id = "default@default.com";
                interviewSetupData.code_link = " ";
                interviewSetupData.feedback = " ";
                interviewSetupData.jobseeker_confirm = "confirm";              
                interviewSetupData.interviewer_confirm = "pending";
                interviewSetupData.date = data.date;
                interviewSetupData.start = data.start;
                interviewSetupData.end = data.end;
                interviewSetupData.title = data.skillset;
                seeker.interviewSetup(interviewSetupData).then(function(data) {
                    console.log(data,"interviewSetup.....");
                });
              }, function() {
                // $log.info('Modal dismissed at: ' + new Date());
            });
        };


    });