'use strict';

/**
 * @ngdoc function
 * @name getReadyNewApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the getReadyNewApp
 */
angular.module('getReadyNewApp')
    .controller('RegisterCtrl', function($scope, seeker, userService, $timeout) {
        this.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];

        var reg = this;
        var loginSessionData = userService.getSessionToken();
        var bucket = new AWS.S3({ params: { Bucket: 'getrecruit' } });
        var fileChooser = document.getElementById('file-chooser');


        reg.register = function(user) {
            // body...

            // console.log(user);
            var file = fileChooser.files[0];
            // console.log(file);
            if (file) {
                var uniqueNum = Math.floor((Math.random() * 10000000000) + 1);

                var filename = 'resumes/' + uniqueNum + file.name;
                var params = { Key: filename, ContentType: file.type, Body: file };
                bucket.upload(params, function(err, data) {
                  // console.log(data);
                    
                    user.resume = data.Location;
                    console.log(user);
                    userService.register(user).then(function(data) {
                       $scope.alerts = [{ type: 'success', msg: 'You are successfully registered' }];
                      $scope.autoHide();
                      user.name = "";
                      user.phone = "";
                      user.accType = "";
                      user.email = "";
                      user.password = "";
                      user.confPassword = "";
                      user.resume="";
            });
                });

            } else {
                console.log('Nothing to upload.');
            }
            
            if (loginSessionData !== undefined && loginSessionData.currentUser.accType === "recruiter") {
                console.log(loginSessionData.currentUser.email, user.email);
                userService.addJobseekerToRecruiter(loginSessionData.currentUser.email, user.email).then(function(data) {
                    console.log("seeker added.....");
                });
            }else{
                console.log('Only Registering');
            }
            // console.log(user);
           
        }


        // function getSeeker() {
        //     seeker.seekerInfo().then(function(data) {
        //         // console.log(data);
        //     });
        // }

        // getSeeker();

        $scope.autoHide = function() {
            $timeout(function() {
                $scope.alerts.splice(0, 1);
            }, 4000);
        };
        $scope.hideAlert = function(index) {
            $scope.alerts.splice(index, 1);
        };

        $scope.getSkillset = function() {
            userService.getSkillset().then(function(data) {
                $scope.skills = data;
                // console.log(data);
            });
        };

        $scope.getSkillset();

        $scope.uploadFile = function() {

            var file = fileChooser.files[0];
            // console.log(file);
            if (file) {
                var uniqueNum = Math.floor((Math.random() * 10000000000) + 1);

                var filename = 'resumes/' + uniqueNum + file.name;
                var params = { Key: filename, ContentType: file.type, Body: file };
                bucket.upload(params, function(err, data) {
                    user.resume = data.location;
                });
            } else {
                console.log('Nothing to upload.');
            }
        }


    });