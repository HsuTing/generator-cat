'use strict';

import assert from 'yeoman-assert';

export default () => {
  it('src/schemas/data/index.js', () => {
    assert.fileContent(
      'src/schemas/data/index.js',
      'import data from \'./getData\';'
    );
    assert.fileContent(
      'src/schemas/data/index.js',
      'import modifyData from \'./modifyData\';'
    );
    assert.fileContent(
      'src/schemas/data/index.js',
      'data'
    );
    assert.fileContent(
      'src/schemas/data/index.js',
      'modifyData'
    );
  });
};
