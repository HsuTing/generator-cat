'use strict';

const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  writing() {
    this.fs.copy(
      this.templatePath('postgresql.js'),
      this.destinationPath('bin/postgresql.js')
    );
  }

  install() {
    this.yarnInstall([
      'cat-utils',
      'pg'
    ]);
  }
};
