'use strict';

import assert from 'yeoman-assert';

export default () => {
  it('src/containers/IndexContainer.js', () => {
    assert.fileContent(
      'src/containers/IndexContainer.js',
      'query IndexContainerQuery($input: String!) {'
    );
    assert.fileContent(
      'src/containers/IndexContainer.js',
      'data(input: $input) {'
    );
  });
};
