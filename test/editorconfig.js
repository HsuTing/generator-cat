'use strict';

var path = require('path');
var assert = require('yeoman-assert');

describe('generator-cat:editorconfig', function () {
  it('creates files', function () {
    assert.file([
      './.editorconfig'
    ]);
  });
});
