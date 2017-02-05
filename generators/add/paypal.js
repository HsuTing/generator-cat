'use strict';

const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  writing() {
    this.fs.copy(
      this.templatePath('paypal.js'),
      this.destinationPath('src/utils/paypal.js')
    );
  }

  install() {
    this.yarnInstall([
      'paypal-rest-sdk'
    ], {dev: true});
  }
};
