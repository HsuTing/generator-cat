'use strict';

import assert from 'yeoman-assert';

export default () => {
  it('index.js', () => {
    assert.jsonFileContent('package.json', {
      scripts: {
        electron: 'electron ./index.js',
        package: 'yarn prod && node ./lib/bin/build-app.js'
      }
    });
    assert.file('index.js');
  });
};
