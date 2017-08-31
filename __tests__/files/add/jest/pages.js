'use strict';

import assert from 'yeoman-assert';

export default () => {
  it('src/__tests__/pages.js', () => {
    assert.file('src/__tests__/pages.js');
  });
};
