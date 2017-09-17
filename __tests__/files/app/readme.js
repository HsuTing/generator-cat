'use strict';

import assert from 'yeoman-assert';

const checkContent = (status, content) => (
  status ?
    assert.fileContent('README.md', content) :
    assert.noFileContent('README.md', content)
);

export default ({
  npm,
  server,
  private: isPrivate
}) => {
  it('README.md', () => {
    assert.file('README.md');

    checkContent(npm, '[![NPM version][npm-image]][npm-url]');
    checkContent(npm, '[npm-image]: https://badge.fury.io/js/test.svg');
    checkContent(npm, '[npm-url]: https://npmjs.org/package/test');

    checkContent(server, '- `start`: Run the prodiction version server.');
    checkContent(server, '- `test-server`: Run the test server with `nodemon`.');

    checkContent(isPrivate, '[![Build Status][circleci-image]][circleci-url]');
    checkContent(!isPrivate, '[![Build Status][travis-image]][travis-url]');

    checkContent(isPrivate, '[circleci-image]: https://circleci.com/gh/HsuTing/test.svg?style=svg&circle-token=token');
    checkContent(isPrivate, '[circleci-url]: https://circleci.com/gh/HsuTing/test');
    checkContent(!isPrivate, '[travis-image]: https://travis-ci.org/HsuTing/test.svg?branch=master');
    checkContent(!isPrivate, '[travis-url]: https://travis-ci.org/HsuTing/test');
  });
};
