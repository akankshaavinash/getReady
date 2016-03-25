'use strict';

describe('Controller: SeekerCtrl', function () {

  // load the controller's module
  beforeEach(module('getReadyNewApp'));

  var SeekerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SeekerCtrl = $controller('SeekerCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(SeekerCtrl.awesomeThings.length).toBe(3);
  });
});
