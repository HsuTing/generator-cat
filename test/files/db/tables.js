'use strict';

import assert from 'yeoman-assert';

export default () => {
  it('src/constants/tables/index.js', () => {
    assert.file('src/constants/tables/index.js');
  });
};
