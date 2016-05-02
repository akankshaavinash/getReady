'use strict';

describe('Controller: JobslistCtrl', function () {

  // load the controller's module
  beforeEach(module('getReadyNewApp'));

  var JobslistCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    JobslistCtrl = $controller('JobslistCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(JobslistCtrl.awesomeThings.length).toBe(3);
  });
});
