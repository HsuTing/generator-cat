#!/bin/env node
var fs = require('fs');
var watch = require('node-watch');
var static = require('./static');

watch('./lib', function() {
  static();
});
