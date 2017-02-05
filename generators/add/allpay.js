'use strict';

const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  writing() {
    this.fs.copy(
      this.templatePath('allpay.js'),
      this.destinationPath('src/utils/allpay.js')
    );
  }

  install() {
    this.yarnInstall([
      'uuid',
      'node-fetch',
      'moment'
    ], {dev: true});
  }
};
