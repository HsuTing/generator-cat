'use strict';

import assert from 'yeoman-assert';

export default () => {
  it('src/contants/query/indexQuery.js', () => {
    assert.fileContent(
      'src/contants/query/indexQuery.js',
      'query indexQuery($input: String!) {'
    );
    assert.fileContent(
      'src/contants/query/indexQuery.js',
      'index(input: $input) {'
    );
  });
};
