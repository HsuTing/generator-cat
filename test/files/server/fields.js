'use strict';

import assert from 'yeoman-assert';

export default () => {
  it('src/schemas/fields.js', () => {
    assert.file('src/schemas/fields.js');
  });
};
