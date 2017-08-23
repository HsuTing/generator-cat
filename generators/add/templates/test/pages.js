'use strict';

const should = require('should');
const fetch = require('fetch-everywhere');

const pages = [{
  path: '/'
}];

describe('pages', () => {
  let server = null;
  before(() => {
    server = require('./../lib/server').default;
  });

  pages.forEach(({path}) => {
    it(path, () => fetch(`http://localhost:8000${path}`)
      .then(res => res.status)
      .should.be.eventually.equal(200)
    );
  });

  after(() => {
    server.close();
  });
});
