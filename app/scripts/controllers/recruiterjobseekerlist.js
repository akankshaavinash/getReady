'use strict';

/**
 * @ngdoc function
 * @name getReadyNewApp.controller:RecruiterjobseekerlistCtrl
 * @description
 * # RecruiterjobseekerlistCtrl
 * Controller of the getReadyNewApp
 */
angular.module('getReadyNewApp')
  .controller('RecruiterjobseekerlistCtrl', function ($scope, $uibModalInstance, items, $filter, userService) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
 
 	var loginSessionData = userService.getSessionToken();
    // console.log(loginSessionData.currentUser.email);
    // console.log(items);
    $scope.items = items;
   	var checked
    $scope.$watch('items', function (newObj, oldObj) {
        checked = $filter('filter')(newObj, {'val': true});
        
        // var unchecked = $filter('filter')(newObj, {'val': false});
        // console.log(checked);
    }, true);
    $scope.ok = function(){
    	// console.log(checked.length);
    	for (var i = 0; i < checked.length; i++) {
    		
    		userService.putAppliedJobList(checked[i].email_id, loginSessionData.currentUser.email, $scope.items.companyCode).then(function(data){

    		});
    	}
    	$uibModalInstance.close();
    };

    $scope.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        };
  });
