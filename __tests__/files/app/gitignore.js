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
  graphql,
  mobileApp
}) => {
  it('.gitignore', () => {
    checkContent(!mobileApp, 'lib');

    checkContent(server, '*.log');

    checkContent(server && website, 'public');

    checkContent(website && graphql, 'schema.graphql');
    checkContent(website && graphql, '__generated__');

    checkContent(mobileApp, '.expo');
  });
};
