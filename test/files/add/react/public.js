'use strict';

import assert from 'yeoman-assert';

export default () => {
  it('src/public/index.js', () => {
    assert.fileContent(
      'src/public/index.js',
      'import Index from \'components/Index\';'
    );
    assert.fileContent(
      'src/public/index.js',
      '<Index />'
    );
  });
};
