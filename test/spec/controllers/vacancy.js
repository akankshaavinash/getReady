'use strict';

describe('Controller: VacancyCtrl', function () {

  // load the controller's module
  beforeEach(module('getReadyNewApp'));

  var VacancyCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    VacancyCtrl = $controller('VacancyCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(VacancyCtrl.awesomeThings.length).toBe(3);
  });
});
