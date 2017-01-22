'use strict';

const generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = generator.extend({
  constructor: function() {
    generator.apply(this, arguments);

    this.log(yosay(
      `Welcome to the cat\'s pajamas ${chalk.red('generator-cat')} generator!`
    ));
  }
});
