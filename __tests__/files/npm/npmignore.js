'use strict';

import assert from 'yeoman-assert';

export default () => {
  it('.npmignore', () => {
    assert.jsonFileContent('package.json', {
      scripts: {
        prepublish: 'yarn babel'
      }
    });

    assert.file('.npmignore');
  });
};
