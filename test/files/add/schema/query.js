'use strict';

import assert from 'yeoman-assert';

export default () => {
  it('src/schemas/data/getData.js', () => {
    assert.fileContent(
      'src/schemas/data/getData.js',
      'description: \'Get the data of the Data.\','
    );
    assert.fileContent(
      'src/schemas/data/getData.js',
      'description: \'This is the args of the Data.\''
    );
    assert.fileContent(
      'src/schemas/data/getData.js',
      'data: \'query Data\''
    );
  });
};
