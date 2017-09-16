'use strict';

import assert from 'yeoman-assert';

export default () => {
  it('src/schemas/index/getIndex.js', () => {
    assert.fileContent(
      'src/schemas/index/getIndex.js',
      'description: \'Get the data of the Index.\','
    );
    assert.fileContent(
      'src/schemas/index/getIndex.js',
      'description: \'This is the args of the Index.\''
    );
    assert.fileContent(
      'src/schemas/index/getIndex.js',
      'data: \'query Index\''
    );
  });
};
