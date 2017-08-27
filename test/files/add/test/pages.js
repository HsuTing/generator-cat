'use strict';

import assert from 'yeoman-assert';

export default () => {
  it('src/test/pages.js', () => {
    assert.file('src/test/pages.js');
  });
};
