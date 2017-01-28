'use strict';

const should = require('should');

describe('test', function() {
  describe('#first', function() {
    it('should be equal to "test"', function() {
      ('test').should.equal('test');
    });
  });
});
