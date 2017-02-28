'use strict';

const Generator = require('yeoman-generator');
const _ = require('lodash');
const extend = _.merge;

module.exports = class extends Generator {
  writing() {
    // pkg
    const currentPkg = this.fs.readJSON(this.destinationPath('package.json'), {});
    const pkg = extend({
      main: './lib/index.js',
      scripts: {
        prepublish: 'yarn babel'
      }
    }, currentPkg);
    this.fs.writeJSON(this.destinationPath('package.json'), pkg);

    // files
    this.fs.copy(
      this.templatePath('npmignore'),
      this.destinationPath('.npmignore')
    );

    this.fs.copy(
      this.templatePath('index.js'),
      this.destinationPath('src/index.js')
    );
  }
};
