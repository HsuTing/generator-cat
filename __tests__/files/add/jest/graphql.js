'use strict';

import assert from 'yeoman-assert';

export default () => {
  it('src/__tests__/data.js', () => {
    assert.fileContent(
      'src/__tests__/data.js',
      'describe(\'data\', () => {'
    );
    assert.fileContent(
      'src/__tests__/data.js',
      'it(\'# query data\', () => expect(graphql(schema, `'
    );
    assert.fileContent(
      'src/__tests__/data.js',
      'data(input: "test") {'
    );
    assert.fileContent(
      'src/__tests__/data.js',
      'data: {'
    );
    assert.fileContent(
      'src/__tests__/data.js',
      'it(\'# mutation data\', () => expect(graphql(schema, `'
    );
    assert.fileContent(
      'src/__tests__/data.js',
      'modifyData(input: {'
    );
    assert.fileContent(
      'src/__tests__/data.js',
      'modifyData: {'
    );
  });
};
