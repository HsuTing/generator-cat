'use strict';

import assert from 'yeoman-assert';

export default () => {
  it('.nycrc', () => {
    assert.jsonFileContent('package.json', {
      scripts: {
        test: 'nyc mocha ./src/test/*.js --recursive --reporter spec'
      }
    });

    assert.file('.nycrc');
  });
};
