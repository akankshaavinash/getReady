'use strict';

/**
 * @ngdoc function
 * @name getReadyNewApp.controller:RecruiterCtrl
 * @description
 * # RecruiterCtrl
 * Controller of the getReadyNewApp
 */
angular.module('getReadyNewApp')
  .controller('RecruiterCtrl', function ($scope, seeker, userService) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    var loginSessionData = userService.getSessionToken();
   console.log(loginSessionData);
    $scope.jobseekerListData = [];
    seeker.getRecruiterData(loginSessionData.currentUser.email).then(function(data){
    	console.log(data.length);
    	var jobseekerList = [];
    	for (var i = 0; i < data.length; i++ ){
    		jobseekerList[i] = data[i].jobseeker_email_id;
    		
    		seeker.getJobseekersInfo(data[i].jobseeker_email_id).then(function(data){

    			$scope.jobseekerListData.push(data[0]);
    			// console.log($scope.jobseekerListData)
    		});

    	}

    });

    $scope.searchJobSeeker = function(){
      // console.log($scope.searchSeeker);
      seeker.getJobseekersInfo($scope.searchSeeker).then(function(data){
        // console.log(data.length);
        if (data.length !== 0) {
          $scope.regSeeker = data[0].email_id + " is registered.";
          $scope.showaddseeker = true;
        }else{
          $scope.regSeeker = "Seeker not found"; 
          $scope.showaddseeker = false;
        }
        
      });
    };

    $scope.addJobSeeker = function(){
      userService.addJobseekerToRecruiter(loginSessionData.currentUser.email, $scope.searchSeeker).then(function(data){
        console.log("seeker added.....");
      });
    }; 
  });
