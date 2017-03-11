'use strict';

const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  writing() {
    this.fs.copy(
      this.templatePath('fb-bot/fb.js'),
      this.destinationPath('src/fb.js')
    );

    this.fs.copy(
      this.templatePath('fb-bot/router.js'),
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
