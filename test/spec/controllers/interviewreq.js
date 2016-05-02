'use strict';

describe('Controller: InterviewreqCtrl', function () {

  // load the controller's module
  beforeEach(module('getReadyNewApp'));

  var InterviewreqCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    InterviewreqCtrl = $controller('InterviewreqCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(InterviewreqCtrl.awesomeThings.length).toBe(3);
  });
});
