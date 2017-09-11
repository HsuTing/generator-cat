'use strict';

import assert from 'yeoman-assert';

export default () => {
  it('src/__tests__/Index.js', () => {
    assert.fileContent(
      'src/__tests__/Index.js',
      'import Index from \'components/Index\''
    );
    assert.fileContent(
      'src/__tests__/Index.js',
      'it(\'Index\', () => {'
    );
    assert.fileContent(
      'src/__tests__/Index.js',
      '<Index />'
    );
    assert.fileContent(
      'src/__tests__/Index.js',
      '<div>This is Index!</div>'
    );
  });
};
