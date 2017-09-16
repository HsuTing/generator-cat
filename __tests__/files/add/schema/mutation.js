'use strict';

import assert from 'yeoman-assert';

export default () => {
  it('src/schemas/index/modifyIndex.js', () => {
    assert.fileContent(
      'src/schemas/index/modifyIndex.js',
      'name: \'Index\','
    );
    assert.fileContent(
      'src/schemas/index/modifyIndex.js',
      'description: \'Modify the data of the Index.\','
    );
    assert.fileContent(
      'src/schemas/index/modifyIndex.js',
      'description: \'This is the args of the Index.\''
    );
    assert.fileContent(
      'src/schemas/index/modifyIndex.js',
      'description: \'This is output data of the Index after modifying the Index.\''
    );
    assert.fileContent(
      'src/schemas/index/modifyIndex.js',
      'data: \'mutation Index\''
    );
  });
};
