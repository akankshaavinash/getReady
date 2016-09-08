'use strict';

/**
 * @ngdoc function
 * @name getReadyNewApp.controller:ConfirmtimeCtrl
 * @description
 * # ConfirmtimeCtrl
 * Controller of the getReadyNewApp
 */
angular.module('getReadyNewApp')
  .controller('ConfirmtimeCtrl', function ($scope, $uibModalInstance, items, seeker) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
   
    var index = items[0];
    var itemArr = items[1];
     console.log(index, itemArr);
     $scope.ok = function() {
        	seeker.interviewerConfirmTime(itemArr[index].jobseeker_email_id);
            $uibModalInstance.close();
        };
    $scope.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        };
  });
