'use strict';

describe('Service: seeker.js', function () {

  // load the service's module
  beforeEach(module('getReadyNewApp'));

  // instantiate service
  var seeker.js;
  beforeEach(inject(function (_seeker.js_) {
    seeker.js = _seeker.js_;
  }));

  it('should do something', function () {
    expect(!!seeker.js).toBe(true);
  });

});
