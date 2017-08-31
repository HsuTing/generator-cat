'use strict';

import fetch from 'fetch-everywhere';

const pages = [{
  path: '/'
}];

describe('pages', () => {
  let server = null;
  before(() => {
    server = require('./../server').default;
  });

  pages.forEach(({path}) => {
    it(path, () => expect(
      fetch(`http://localhost:8000${path}`)
        .then(res => res.status)
      ).resolves.toBe(200));
  });

  after(() => {
    server.close();
  });
});
