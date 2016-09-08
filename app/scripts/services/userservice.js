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
        var ACC_TYPE = 'accType';
        

        this.register = function(userData) {
            console.log(userData);
            console.log(userData.name);
            console.log(userData.resume);
           

        	var tableName;
            var query = '';
            if (userData.accType === 'seeker') {
                tableName = 'Jobseeker';
                query = "INSERT INTO "+ tableName +" (email_id, password, phone, name, skillset, acc_type, resume) VALUES ('"+ userData.email +"','"+userData.password +"','"+ userData.phone +"','"+ userData.name +"','"+ userData.skillset +"','"+ userData.accType +"','"+userData.resume+"')";
            } else {
                tableName = 'Interviewer';
                query = "INSERT INTO "+ tableName +" (email_id, password, phone, name, skillset, acc_type) VALUES ('"+ userData.email +"','"+userData.password +"','"+ userData.phone +"','"+ userData.name +"','"+ userData.skillset +"','"+ userData.accType +"')";
            }
            
        	console.log(query);
            var postData = {
                "operation": "query",
                "query": query
            }
            // console.log(postData);
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
            // console.log(userData);
            var tableName;
            var accType = "";
            var deferred = $q.defer();
            var url = apiBaseUrl + 'jobseeker';

            if (userData.accType === 'seeker') {
                tableName = 'Jobseeker';
                accType = 'seeker';
            }else if(userData.accType === 'recruiter'){
                tableName = 'Recruiter';
                accType = 'recruiter';
            }else{
                tableName = 'Interviewer';
                accType = 'interviewer';
            }
           
             var postData = {
                "operation": "query",
                "query": "SELECT * FROM " + tableName + " WHERE email_id = '" + userData.email +"'"
             }
             // console.log(postData);
            apiservice.apiCall('POST', url, postData).then(function(data) {
                console.log(data);
                deferred.resolve(data);
            });
            return deferred.promise;
        };

        this.vacancyList = function(){
            var deferred = $q.defer();
            var url = apiBaseUrl + 'jobseeker';
            var postData = {
                "operation": "query",
                "query": "SELECT * FROM Vacancy"
             }
             // console.log(postData);
            apiservice.apiCall('POST', url, postData).then(function(data) {
                deferred.resolve(data);
            });
            return deferred.promise;
        };

        this.setSessionToken = function (email_id, acc_type) {
            
           var obj = {
                currentUser: {
                  email: email_id,
                  accType: acc_type
                }
              };
          return $cookies.putObject(LOGIN_COOKIE, obj);
        };

        this.getSessionToken = function () {
        
          return $cookies.getObject(LOGIN_COOKIE);
        };

        this.removeSessionToken = function () {
          $cookies.remove(LOGIN_COOKIE);
        };

        this.applyForJob = function(skill, recruiterEmailId, companyCode){
            var deferred = $q.defer();
            var url = apiBaseUrl + 'jobseeker';
            var postData = {
                "operation": "query",
                // "query": "SELECT a.name, a.email_id FROM Jobseeker a, Recruiter b, Vacancy c WHERE a.skillset= c.skillset AND b.jobseeker_email_id=a.email_id AND b.email_id = '" + recruiterEmailId + "' AND c.company_job_code = '"+ companyCode +"'"
                "query": "SELECT DISTINCT a.name, a.email_id FROM Jobseeker a, Recruiter b, Vacancy c WHERE a.skillset = '"+ skill +"' AND b.jobseeker_email_id = a.email_id AND b.email_id = '"+ recruiterEmailId +"'"
             }
             // console.log(postData);
            apiservice.apiCall('POST', url, postData).then(function(data) {
                deferred.resolve(data);
            });
            return deferred.promise;
        };

        this.putAppliedJobList = function(email_id, recruiterEmailId, companyCode){
            // console.log(email_id, recruiterEmailId, companyCode);
            var deferred = $q.defer();
            var url = apiBaseUrl + 'jobseeker';
            var postData = {
                "operation": "query",
                "query": "INSERT INTO Application (jobseeker_email_id, recruiter_email_id, status, vacancy) VALUES('" + email_id +"','" + recruiterEmailId +"', 'applied', '"+companyCode +"');"
            };

            return $q(function(resolve, reject) {
                apiservice.apiCall('POST', url, postData).then(function(data) {
                    resolve(data);
                }, function() {
                    reject(data);
                });
            });
        };

        this.getAppliedJobList = function(){
            var deferred = $q.defer();
            var url = apiBaseUrl +'jobseeker';
            var postData = {
                "operation" : "query",
                "query" : "SELECT * FROM Application"
            };

            apiservice.apiCall('POST', url, postData).then(function(data) {
                deferred.resolve(data);
            });
            return deferred.promise;

        };

        this.addJobseekerToRecruiter = function(recruiter_id, jobseeker_email_id, recruiter_name, password, recruiter_ph){
           var deferred = $q.defer();
            var url = apiBaseUrl + 'jobseeker';
            var postData = {
                "operation": "query",
                "query": "INSERT INTO Recruiter (email_id, jobseeker_email_id, acc_type, name, password, phone) VALUES('" + recruiter_id +"','" + jobseeker_email_id +"', 'recruiter', '"+ recruiter_name +"' , '" + password +"','"+ recruiter_ph +"');"
            };

            return $q(function(resolve, reject) {
                apiservice.apiCall('POST', url, postData).then(function(data) {
                    resolve(data);
                }, function() {
                    reject(data);
                });
            }); 
        };

        this.getSkillset = function(){
            var deferred = $q.defer();
            var url = apiBaseUrl +'jobseeker';
            var postData = {
                "operation" : "query",
                "query" : "SELECT * FROM skillset"
            };

            apiservice.apiCall('POST', url, postData).then(function(data) {
                deferred.resolve(data);
            });
            return deferred.promise;
        }
    });


