'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('cat:static', function () {
  it('generate gulp-tasks/render.js', function() {
    assert.file(['render.js']);
  });
});
