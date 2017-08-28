'use strict';

import assert from 'yeoman-assert';

const checkContent = (status, content) => (
  status ?
    assert.fileContent('.npmignore', content) :
    assert.noFileContent('.npmignore', content)
);

export default ({
  test
}) => {
  it('.npmignore', () => {
    assert.jsonFileContent('package.json', {
      scripts: {
        prepublish: 'yarn babel'
      }
    });

    checkContent(test, '.travis.yml');
    checkContent(test, 'test');
    checkContent(test, '.nycrc');
    checkContent(test, 'coverage');
    checkContent(test, '.nyc_output');
  });
};
