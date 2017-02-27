'use strict';

const should = require('should');

describe('test', () => {
  describe('#first', () => {
    it('should be equal to "test"', () => {
      ('test').should.equal('test');
    });
  });
});
