'use strict';

describe('Controller: InterviewerCtrl', function () {

  // load the controller's module
  beforeEach(module('getReadyNewApp'));

  var InterviewerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    InterviewerCtrl = $controller('InterviewerCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(InterviewerCtrl.awesomeThings.length).toBe(3);
  });
});
