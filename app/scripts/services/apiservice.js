'use strict';

/**
 * @ngdoc service
 * @name getReadyNewApp.apiservice
 * @description
 * # apiservice
 * Service in the getReadyNewApp.
 */
angular.module('getReadyNewApp')
  .service('apiservice', function ($q, $http) {
    // AngularJS will instantiate a singleton by calling "new" on this function
     this.apiCall = function(method, url, postData){
      //console.log('moback api call');
      return $q(function(resolve, reject) {
        // var apiHeaders = headers ? headers : {};
        // apiHeaders['X-Moback-Source-Key'] = 'MmRkNWY3NTgtOTQ0MS00ZGU5LWIzYTktOWMzYTk2ODQ4OTJj';
        var req = {
          method: method,
          url: url
        };
        if(postData){
          req.data = postData;
        }
        $http(req).
          success(function (data) {
            resolve(data);
          }).
          error(function (data) {
            reject(data);
          });
      });
    };
  });
