'use strict';

import assert from 'yeoman-assert';

export default () => {
  it('src/schemas/index/index.js', () => {
    assert.fileContent(
      'src/schemas/index/index.js',
      'import index from \'./getIndex\';'
    );
    assert.fileContent(
      'src/schemas/index/index.js',
      'import modifyIndex from \'./modifyIndex\';'
    );
    assert.fileContent(
      'src/schemas/index/index.js',
      'index'
    );
    assert.fileContent(
      'src/schemas/index/index.js',
      'modifyIndex'
    );
  });
};
