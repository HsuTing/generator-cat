'use strict';

var generator = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = generator.extend({
  constructor: function() {
    generator.Base.apply(this, arguments);

    this.log(yosay(
      'Welcome to the cat\'s pajamas ' + chalk.red('generator-cat') + ' generator!'
    ));
  }
});
