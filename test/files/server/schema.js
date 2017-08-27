'use strict';

import assert from 'yeoman-assert';

export default () => {
  it('src/schemas/schema.js', () => {
    assert.file('src/schemas/schema.js');
  });
};
