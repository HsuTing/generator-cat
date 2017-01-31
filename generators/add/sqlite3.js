'use strict';

const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  writing() {
    this.fs.copy(
      this.templatePath('sqlite3.js'),
      this.destinationPath('src/utils/sqlite3.js')
    );
  }

  install() {
    this.yarnInstall([
      'sqlite3'
    ], {dev: true});
  }
};
