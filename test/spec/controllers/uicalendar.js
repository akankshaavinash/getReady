'use strict';

describe('Controller: UicalendarCtrl', function () {

  // load the controller's module
  beforeEach(module('getReadyNewApp'));

  var UicalendarCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    UicalendarCtrl = $controller('UicalendarCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(UicalendarCtrl.awesomeThings.length).toBe(3);
  });
});
