'use strict';

import assert from 'yeoman-assert';

export default () => {
  it('src/reducers/test.js', () => {
    assert.fileContent('src/reducers/test.js', 'case \'CHANGE_TEST\':');
  });
};
