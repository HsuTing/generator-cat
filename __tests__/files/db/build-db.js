'use strict';

import assert from 'yeoman-assert';

export default () => {
  it('src/bin/build-db.js', () => {
    assert.file('src/bin/build-db.js');
  });
};
