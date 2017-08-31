'use strict';

import assert from 'yeoman-assert';

export default () => {
  it('src/schemas/data/dataType.js', () => {
    assert.fileContent(
      'src/schemas/data/dataType.js',
      'name: \'Data\','
    );
    assert.fileContent(
      'src/schemas/data/dataType.js',
      'description: \'This is the type of the Data.\','
    );
    assert.fileContent(
      'src/schemas/data/dataType.js',
      'description: \'This is the data of the Data.\''
    );
    assert.fileContent(
      'src/schemas/data/dataType.js',
      'id: globalIdField(\'Data\')'
    );
  });
};
