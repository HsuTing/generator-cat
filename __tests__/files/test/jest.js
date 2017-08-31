'use strict';

import assert from 'yeoman-assert';

export default () => {
  it('.nycrc', () => {
    assert.jsonFileContent('package.json', {
      scripts: {
        test: 'jest --silent',
        'test:watch': 'yarn test -- --watchAll'
      }
    });

    assert.file('jest.config.js');
  });
};
