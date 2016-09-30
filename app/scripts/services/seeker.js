'use strict';

/**
 * @ngdoc service
 * @name getReadyNewApp.seeker
 * @description
 * # seeker
 * Service in the getReadyNewApp.
 */
angular.module('getReadyNewApp')
    .service('seeker', function($http, $q, config, apiservice, userService) {
        // AngularJS will instantiate a singleton by calling "new" on this function
        var apiBaseUrl = config.apiEndpoint;
        var url = apiBaseUrl + 'jobseeker';

        // this.seekerInfo = function() {
        //     var deferred = $q.defer();
        //     // var url = apiBaseUrl + 'jobseeker';
        //     var postData = {
        //         "tableName": 'Interview',
        //         "operation": "read",
        //         "payload": {
        //             "fieldName1": "interviewer_email_id",
        //             "fieldValue1": "int@gmail.com"
        //         }
        //     }
        //     apiservice.apiCall('POST', url, postData).then(function(data) {
        //         // console.log(data);
        //         deferred.resolve(data);
        //     });
        //     return deferred.promise;
        // };


        this.interviewSetup = function(data) {
           // console.log(data);
            var deferred = $q.defer();
            var query = "INSERT INTO Interview (jobseeker_email_id, interviewer_email_id, code_link, date, start, end, feedback, title, jobseeker_confirm, interviewer_confirm) VALUES ('"+ data.jobseeker_email_id +"','"+ data.interviewer_email_id +"','"+ data.code_link +"','"+ data.date +"','"+ data.start +"','"+ data.end +"','"+data.feedback +"','"+ data.title +"','"+ data.jobseeker_confirm+"','"+ data.interviewer_confirm+"')";
            var postData = {
                "operation": "query",
                "query": query
             }
            return $q(function(resolve, reject) {
                apiservice.apiCall('POST', url, postData).then(function(data) {
                    resolve(data);
                }, function() {
                    reject(data);
                });
            });
        };

        this.getInterviewSetup = function(){
            var loginSessionData = userService.getSessionToken();
            var deferred = $q.defer();
            // var url = apiBaseUrl + 'jobseeker';
            var fieldName = "";
            var accType = "";
            
            if (loginSessionData !== undefined) {
                if (loginSessionData.currentUser.accType === 'seeker') {
                    fieldName = "jobseeker_email_id";
                    accType = 'seeker'
                    var query = "SELECT * FROM Interview WHERE "+ fieldName +"= '" + loginSessionData.currentUser.email +"'";
                }else{
                    fieldName = "interviewer_email_id";
                    accType = 'interviewer';
                    var query = "SELECT * FROM Interview WHERE title ='"+ loginSessionData.currentUser.skill +"' AND ( interviewer_email_id ='" + loginSessionData.currentUser.email +"' OR interviewer_email_id = 'default@default.com')";
                }          
            }
            
            
            // console.log(query);
            var postData = {
                "operation": "query",
                "query": query
            };
            
            apiservice.apiCall('POST', url, postData).then(function(data) {
               
                deferred.resolve(data);
            });
            return deferred.promise;
        }

        this.getRecruiterData = function(emailId){
            var deferred = $q.defer();
            
            var postData = {
                "operation": "query",
                "query": "SELECT * FROM RecruiterCandidates WHERE recruiter_emailid = '" + emailId +"'"
             }

            apiservice.apiCall('POST', url, postData).then(function(data) {
               
                deferred.resolve(data);
            });
            return deferred.promise;
        };

        this.getJobseekersInfo = function(emailId){
            var deferred = $q.defer();
            
            var postData = {
                "operation": "query",
                "query": "SELECT * FROM Jobseeker WHERE email_id = '" + emailId +"'"
             }
            apiservice.apiCall('POST', url, postData).then(function(data) {
                deferred.resolve(data);
            });
            return deferred.promise;
        };

        this.interviewerConfirmTime = function(seekerEmailId){
            console.log(seekerEmailId);
            var loginSessionData = userService.getSessionToken();
            var deferred = $q.defer();
            var postData = {
                "operation": "query",
                "query": "UPDATE Interview SET interviewer_confirm = 'confirm', interviewer_email_id = '"+ loginSessionData.currentUser.email +"' WHERE jobseeker_email_id = '" + seekerEmailId +"' AND interviewer_email_id = 'default@default.com'"
             }
            apiservice.apiCall('POST', url, postData).then(function(data) {
                deferred.resolve(data);
            });
            return deferred.promise;
        };
        this.setInterviewerFeedback = function(feedback){
            console.log(feedback);
            var deferred = $q.defer();
            // var query = "INSERT INTO Interview (jobseeker_email_id, interviewer_email_id, code_link, date, start, end, feedback, title, jobseeker_confirm, interviewer_confirm) VALUES ('"+ data.jobseeker_email_id +"','"+ data.interviewer_email_id +"','"+ data.code_link +"','"+ data.date +"','"+ data.start +"','"+ data.end +"','"+data.feedback +"','"+ data.title +"','"+ data.jobseeker_confirm+"','"+ data.interviewer_confirm+"')";
            var query = "UPDATE Interview SET feedback = '"+feedback.msg+"', status = '"+feedback.result+"' WHERE jobseeker_email_id = '"+feedback.jobseeker_email_id+"' AND interviewer_email_id = '"+feedback.interviewer_email_id+"'";
            console.log(query);
            var postData = {
                "operation": "query",
                "query": query
             }

            apiservice.apiCall('POST', url, postData).then(function(data) {
                deferred.resolve(data);
            });
            return deferred.promise;
            // return $q(function(resolve, reject) {
            //     apiservice.apiCall('POST', url, postData).then(function(data) {
            //         resolve(data);
            //     }, function() {
            //         reject(data);
            //     });
            // });
        }
    });