'use strict';

import assert from 'yeoman-assert';

const checkContent = (status, content) => (
  status ?
    assert.fileContent('README.md', content) :
    assert.noFileContent('README.md', content)
);

export default ({
  npm,
  test,
  server
}) => {
  it('README.md', () => {
    assert.file('README.md');

    checkContent(npm, '[![NPM version][npm-image]][npm-url]');
    checkContent(npm, '[npm-image]: https://badge.fury.io/js/test.svg');
    checkContent(npm, '[npm-url]: https://npmjs.org/package/test');

    checkContent(test, '[![Build Status][travis-image]][travis-url]');
    checkContent(test, '- `test`: Run the test.');
    checkContent(test, '[travis-image]: https://travis-ci.org/HsuTing/test.svg?branch=master');
    checkContent(test, '[travis-url]: https://travis-ci.org/HsuTing/test');

    checkContent(server, '- `start`: Run the prodiction version server.');
    checkContent(server, '- `test-server`: Run the test server with `nodemon`.');
  });
};
