'use strict';

import assert from 'yeoman-assert';

export default () => {
  it('src/test/data.js', () => {
    assert.fileContent(
      'src/test/data.js',
      'describe(\'data\', () => {'
    );
    assert.fileContent(
      'src/test/data.js',
      'it(\'# query data\', () => graphql(schema, `'
    );
    assert.fileContent(
      'src/test/data.js',
      'data(input: "test") {'
    );
    assert.fileContent(
      'src/test/data.js',
      'data: {'
    );
    assert.fileContent(
      'src/test/data.js',
      'it(\'# mutation data\', () => graphql(schema, `'
    );
    assert.fileContent(
      'src/test/data.js',
      'modifyData(input: {'
    );
    assert.fileContent(
      'src/test/data.js',
      'modifyData: {'
    );
  });
};
