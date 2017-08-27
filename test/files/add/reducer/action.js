'use strict';

import assert from 'yeoman-assert';

export default () => {
  it('src/actions/test.js', () => {
    assert.fileContent(
      'src/actions/test.js',
      'export const modifyTest = options => ({'
    );
    assert.fileContent(
      'src/actions/test.js',
      'type: \'CHANGE_TEST\''
    );
  });
};
