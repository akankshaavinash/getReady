'use strict';

describe('Controller: ConfirmtimeCtrl', function () {

  // load the controller's module
  beforeEach(module('getReadyNewApp'));

  var ConfirmtimeCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ConfirmtimeCtrl = $controller('ConfirmtimeCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ConfirmtimeCtrl.awesomeThings.length).toBe(3);
  });
});
