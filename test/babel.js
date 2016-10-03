'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('cat:babel', function () {
  it('generate .babelrc, gulp-tasks/babel.js', function() {
    assert.file(['./.babelrc', './gulp-tasks/babel.js']);
  });
});
