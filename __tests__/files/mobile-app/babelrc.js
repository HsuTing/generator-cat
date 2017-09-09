'use strict';

import assert from 'yeoman-assert';

export default () => {
  it('.babelrc', () => {
    assert.file('.babelrc');
  });
};
