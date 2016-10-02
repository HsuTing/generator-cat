'use strict';

var path = require('path');
var assert = require('yeoman-assert');

describe('generator-cat:git', function () {
  it('creates files', function () {
    assert.file([
      './.gitignore'
    ]);
  });
});
