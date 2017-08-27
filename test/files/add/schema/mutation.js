'use strict';

import assert from 'yeoman-assert';

export default () => {
  it('src/schemas/data/modifyData.js', () => {
    assert.fileContent(
      'src/schemas/data/modifyData.js',
      'name: \'Data\','
    );
    assert.fileContent(
      'src/schemas/data/modifyData.js',
      'description: \'Modify the data of the Data.\','
    );
    assert.fileContent(
      'src/schemas/data/modifyData.js',
      'description: \'This is the args of the Data.\''
    );
    assert.fileContent(
      'src/schemas/data/modifyData.js',
      'description: \'This is output data of the Data after modifying the Data.\''
    );
    assert.fileContent(
      'src/schemas/data/modifyData.js',
      'data: \'mutation Data\''
    );
  });
};
