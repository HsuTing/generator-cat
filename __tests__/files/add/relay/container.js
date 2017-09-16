'use strict';

import assert from 'yeoman-assert';

export default () => {
  it('src/containers/IndexContainer.js', () => {
    assert.fileContent(
      'src/containers/IndexContainer.js',
      'import indexQuery, {variables as indexVariables} from \'constants/query/indexQuery\';'
    );
    assert.fileContent(
      'src/containers/IndexContainer.js',
      'query={indexQuery}'
    );
    assert.fileContent(
      'src/containers/IndexContainer.js',
      'variables={indexVariables}'
    );
  });
};
