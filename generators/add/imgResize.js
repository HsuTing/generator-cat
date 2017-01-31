'use strict';

const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  writing() {
    this.fs.copy(
      this.templatePath('imgResize.js'),
      this.destinationPath('src/utils/imgResize.js')
    );
  }
};
