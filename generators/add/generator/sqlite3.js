'use strict';

const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  writing() {
    this.fs.copy(
      this.templatePath('sqlite3.js'),
      this.destinationPath('bin/sqlite3.js')
    );
  }

  install() {
    this.yarnInstall([
      'cat-utils',
      'sqlite3'
    ]);
  }
};
