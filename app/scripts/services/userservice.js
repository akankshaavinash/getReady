'use strict';

/**
 * @ngdoc service
 * @name getReadyNewApp.userService
 * @description
 * # userService
 * Service in the getReadyNewApp.
 */
angular.module('getReadyNewApp')
    .service('userService', function($http, $q, $cookies, config, apiservice) {
        // AngularJS will instantiate a singleton by calling "new" on this function
        var apiBaseUrl = config.apiEndpoint;
        var LOGIN_COOKIE = 'loginSession';

        this.setSessionToken = function (data) {
          return $cookies.put(LOGIN_COOKIE, data);
        };

        this.getSessionToken = function () {
          return $cookies.get(LOGIN_COOKIE);
        };

        this.removeSessionToken = function () {
          $cookies.remove(LOGIN_COOKIE);
        };

        this.register = function(userData) {
        	var tableName;
            if (userData.accType === 'Seeker') {
                tableName = 'Jobseeker';
            } else {
                tableName = 'Interviewer';
            }
            var payload = {
            	'email_id':userData.email, 
            	'password': userData.password, 
            	'phone': userData.phone,
            	'name': userData.name,
            	'skillset': userData.skillset
            }
        	var postData = {
                "tableName": tableName,
                "operation": "create",
                "payload": payload
            }
            return $q(function(resolve, reject) {
                var url =  apiBaseUrl + 'jobseeker';
                 apiservice.apiCall('POST', url, postData).then(function(data) {
                    resolve(data);
                }, function() {
                    reject(data);
                });
            });
        };

        this.login = function(userData){
            console.log(userData);
            var deferred = $q.defer();
            var url = apiBaseUrl + 'jobseeker';
            var postData = {
                "tableName": 'Jobseeker',
                "operation": "query",
                "payload": {
                    "fieldName1": "email_id",
                    "fieldValue1": userData.email
                }
            }
            apiservice.apiCall('POST', url, postData).then(function(data) {
                // console.log(data);
                deferred.resolve(data);
            });
            return deferred.promise;
        };

        this.logout = function(){
          
        };

    });


