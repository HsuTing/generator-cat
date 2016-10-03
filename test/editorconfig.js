'use strict';

var path = require('path');
var assert = require('yeoman-assert');

describe('cat:editorconfig', function () {
  it('generate .editorconfig', function () {
    assert.file(['./.editorconfig']);
  });
});
