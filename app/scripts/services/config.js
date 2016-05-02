'use strict';

/**
 * @ngdoc service
 * @name getReadyNewApp.config
 * @description
 * # config
 * Constant in the getReadyNewApp.
 */
angular.module('getReadyNewApp')
  .constant('config', {
  	name:'production',
  	apiEndpoint: 'https://oet1db6qs9.execute-api.us-west-2.amazonaws.com/prod/'
  });
