'use strict';

/**
 * @ngdoc service
 * @name getReadyNewApp.account
 * @description
 * # account
 * Service in the getReadyNewApp.
 */
angular.module('getReadyNewApp')
    .service('account', function() {
        // AngularJS will instantiate a singleton by calling "new" on this function
        this.register = function() {
            var deferred = $q.defer();
            var url = apiBaseUrl + 'jobseeker';
            var postData = {
                "tableName": 'Jobseeker',
                "operation": "create",
                "payload": {
                    "fieldName1": "email_id",
                    "fieldValue1": "jobseeker1@gmail.com"
                }
            }
            apiservice.apiCall('POST', url, postData).then(function(data) {
                // console.log(data);
                deferred.resolve(data);
            });
            return deferred.promise;
        }
    });