'use strict';

describe('Service: seeker', function () {

  // load the service's module
  beforeEach(module('getReadyNewApp'));

  // instantiate service
  var seeker;
  beforeEach(inject(function (_seeker_) {
    seeker = _seeker_;
  }));

  it('should do something', function () {
    expect(!!seeker).toBe(true);
  });

});
