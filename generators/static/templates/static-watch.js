#!/bin/env node

var watch = require('node-watch');
var static = require('./static');

watch('./../lib', function(filename) {
  static();
});
