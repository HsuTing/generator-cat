'use strict';

import assert from 'yeoman-assert';

const checkContent = (status, content) => (
  status ?
    assert.fileContent('.travis.yml', content) :
    assert.noFileContent('.travis.yml', content)
);

export default ({
  website,
  graphql,
  mobileApp
}) => {
  it('.travis.yml', () => {
    checkContent(website && graphql, 'before_install:');
    checkContent(website && graphql, '- sudo apt-get -qq update');
    checkContent(website && graphql, '- sudo apt-get install -y git');
    checkContent(website && graphql, '- git clone https://github.com/facebook/watchman.git');
    checkContent(website && graphql, '- cd watchman');
    checkContent(website && graphql, '- git checkout v4.7.0');
    checkContent(website && graphql, '- ./autogen.sh');
    checkContent(website && graphql, '- ./configure');
    checkContent(website && graphql, '- make');
    checkContent(website && graphql, '- sudo make install');
    checkContent(website && graphql, '- cd ./../');

    checkContent(!mobileApp, '- yarn build');
    checkContent(!mobileApp, '- yarn prod');
  });
};
