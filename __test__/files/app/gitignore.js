'use strict';

import assert from 'yeoman-assert';

const checkContent = (status, content) => (
  status ?
    assert.fileContent('.gitignore', content) :
    assert.noFileContent('.gitignore', content)
);

export default ({
  website,
  server,
  test
}) => {
  it('.gitignore', () => {
    checkContent(server, '*.log');

    checkContent(server && website, 'public');

    checkContent(test, 'coverage');
    checkContent(test, '.nyc_output');
  });
};
