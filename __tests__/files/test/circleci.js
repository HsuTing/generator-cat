'use strict';

import assert from 'yeoman-assert';

const checkContent = (status, content) => (
  status ?
    assert.fileContent('.circleci/config.yml', content) :
    assert.noFileContent('.circleci/config.yml', content)
);

export default ({
  website,
  graphql,
  mobileApp
}) => {
  it('.circleci/config.yml', () => {
    checkContent(website && graphql, '- image: jotadrilo/watchman');

    checkContent(!mobileApp, '- run:');
    checkContent(!mobileApp, 'name: Build');
    checkContent(!mobileApp, 'command: yarn build');
    checkContent(!mobileApp, 'name: Prod');
    checkContent(!mobileApp, 'command: yarn prod');
  });
};
