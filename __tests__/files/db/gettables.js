'use strict';

import assert from 'yeoman-assert';

export default () => {
  it('src/utils/getTables.js', () => {
    assert.file('src/utils/getTables.js');
  });
};
