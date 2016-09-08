'use strict';

describe('Controller: RecruiterjobseekerlistCtrl', function () {

  // load the controller's module
  beforeEach(module('getReadyNewApp'));

  var RecruiterjobseekerlistCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RecruiterjobseekerlistCtrl = $controller('RecruiterjobseekerlistCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(RecruiterjobseekerlistCtrl.awesomeThings.length).toBe(3);
  });
});
