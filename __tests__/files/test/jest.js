'use strict';

import assert from 'yeoman-assert';

const checkContent = (status, content) => (
  status ?
    assert.fileContent('jest.config.js', content) :
    assert.noFileContent('jest.config.js', content)
);

export default ({
  website,
  mobileApp
}) => {
  it('jest.config.js', () => {
    assert.jsonFileContent('package.json', {
      scripts: {
        test: 'jest --silent',
        'test:watch': 'yarn test -- --watchAll'
      }
    });

    checkContent(mobileApp, 'preset: \'jest-expo\',');
    checkContent(website && !mobileApp, '\'!**/public/**\',');
  });
};
