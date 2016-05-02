'use strict';

/**
 * @ngdoc service
 * @name getReadyNewApp.seeker
 * @description
 * # seeker
 * Service in the getReadyNewApp.
 */
angular.module('getReadyNewApp')
    .service('seeker', function($http, $q, config, apiservice) {
        // AngularJS will instantiate a singleton by calling "new" on this function
        var apiBaseUrl = config.apiEndpoint;

        this.seekerInfo = function() {
            var deferred = $q.defer();
            var url = apiBaseUrl + 'jobseeker';
            var postData = {
                "tableName": 'Jobseeker',
                "operation": "read",
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
        };


        this.interviewSetup = function() {
            var deferred = $q.defer();
            var url = apiBaseUrl + 'jobseeker';
            var postData = {
                "tableName": "Interview",
                "operation": "create",
                "payload": {
                    "jobseeker_email_id": "jobseeker3@gmail.com",
                    "interviewer_email_id": "interviewer4@gmail.com",
                    "code_link": "www.google.com",
                    "feedback": "Pending",
                    "interviewer_confirm": "confirm",
                    "jobseeker_confirm": "confirm",
                    "time_date": "05/06/16"
                }
            };
            return $q(function(resolve, reject) {
                apiservice.apiCall('POST', url, postData).then(function(data) {
                    resolve(data);
                }, function() {
                    reject(data);
                });
            });
        };

        this.getInterviewSetup = function(){
            var deferred = $q.defer();
            var url = apiBaseUrl + 'jobseeker';
            var postData = {
                "tableName": 'Interview',
                "operation": "query",
                "payload": {
                    "fieldName1": "jobseeker_email_id",
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