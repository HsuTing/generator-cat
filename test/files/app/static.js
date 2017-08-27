'use strict';

import assert from 'yeoman-assert';

export default () => {
  it('static.config.js', () => {
    assert.file('static.config.js');
  });
};
