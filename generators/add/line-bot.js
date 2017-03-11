'use strict';

const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  writing() {
    this.fs.copy(
      this.templatePath('line-bot/line.js'),
      this.destinationPath('src/line.js')
    );

    this.fs.copy(
      this.templatePath('line-bot/router.js'),
      this.destinationPath('src/router.js')
    );
  }

  install() {
    this.yarnInstall([
      'cat-middleware',
      'request'
    ]);
  }
};
