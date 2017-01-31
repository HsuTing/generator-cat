'use strict';

const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  writing() {
    this.fs.copy(
      this.templatePath('nodemailer.js'),
      this.destinationPath('src/utils/nodemailer.js')
    );
  }

  install() {
    this.yarnInstall([
      'react',
      'react-dom'
    ]);
    this.yarnInstall([
      'nodemailer'
    ], {dev: true});
  }
};
