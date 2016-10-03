'use strict';

var path = require('path');
var assert = require('yeoman-assert');

describe('cat:git', function () {
  it('generate .gitignore', function () {
    assert.file(['./.gitignore']);
  });
});
