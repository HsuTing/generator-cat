'use strict';

import assert from 'yeoman-assert';

export default () => {
  it('src/constants/models.js', () => {
    assert.file('src/constants/models.js');
  });
};
