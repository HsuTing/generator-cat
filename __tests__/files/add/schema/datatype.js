'use strict';

import assert from 'yeoman-assert';

export default () => {
  it('src/schemas/index/dataType.js', () => {
    assert.fileContent(
      'src/schemas/index/dataType.js',
      'name: \'Index\','
    );
    assert.fileContent(
      'src/schemas/index/dataType.js',
      'description: \'This is the type of the Index.\','
    );
    assert.fileContent(
      'src/schemas/index/dataType.js',
      'description: \'This is the data of the Index.\''
    );
    assert.fileContent(
      'src/schemas/index/dataType.js',
      'id: globalIdField(\'Index\')'
    );
  });
};
