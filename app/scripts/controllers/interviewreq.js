'use strict';

/**
 * @ngdoc function
 * @name getReadyNewApp.controller:InterviewreqCtrl
 * @description
 * # InterviewreqCtrl
 * Controller of the getReadyNewApp
 */
angular.module('getReadyNewApp')
    .controller('InterviewreqCtrl', function($scope, $uibModalInstance, items) {
        this.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];
         
        $scope.ok = function() {

        	var interviewSetup = { skillset: $scope.skillset, date: $scope.dt, time: $scope.mytime };
        	console.log(interviewSetup);
            //validate the data here
            // if ($scope.existingObjectId) {
            //     $modalInstance.close($scope.existingObjectId);
            // } else {
            //     $scope.alerts = [{ type: 'danger', msg: 'Please enter an existing objectId' }];
            //     $scope.autoHide();
            // }
            $uibModalInstance.close(interviewSetup);
        };

        $scope.today = function() {
		   $scope.dt = new Date();
		};
		
		$scope.today();

		$scope.clear = function() {
		   $scope.dt = null;
		};

		$scope.inlineOptions = {
		    customClass: getDayClass,
		    minDate: new Date()
		  };

		  $scope.dateOptions = {
		    dateDisabled: disabled,
		    formatYear: 'yy',
		    maxDate: new Date(2020, 5, 22),
		    minDate: new Date(),
		    startingDay: 1
		  };
		  $scope.open1 = function() {
		    $scope.popup1.opened = true;
		  };

		  $scope.popup1 = {
		    opened: false
		  };
		  // Disable weekend selection
		  function disabled(data) {
		    var date = data.date,
		      mode = data.mode;
		    return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
		  }

		  function getDayClass(data) {
		    var date = data.date,
		      mode = data.mode;
		    if (mode === 'day') {
		      var dayToCheck = new Date(date).setHours(0,0,0,0);

		      for (var i = 0; i < $scope.events.length; i++) {
		        var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

		        if (dayToCheck === currentDay) {
		          return $scope.events[i].status;
		        }
		      }
		    }

		    return '';
		  }
		
		  // time picker
		  $scope.mytime = new Date();

		  $scope.hstep = 1;
		  $scope.mstep = 1;

		  $scope.options = {
		    hstep: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
		    mstep: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57,58,59]
		  };
		  $scope.ismeridian = true;


        $scope.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        };
    });