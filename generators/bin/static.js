'use strict';

const Generator = require('yeoman-generator');
const _ = require('lodash');
const extend = _.merge;

module.exports = class extends Generator {
  writing() {
    // pkg
    const currentPkg = this.fs.readJSON(this.destinationPath('package.json'), {});
    const pkg = extend({
      scripts: {
        static: 'node ./bin/static.js'
      }
    }, currentPkg);
    this.fs.writeJSON(this.destinationPath('package.json'), pkg);

    // files
    this.fs.copy(
      this.templatePath('static.js'),
      this.destinationPath('bin/static.js')
    );
  }

  install() {
    this.yarnInstall([
      'nunjucks',
      'chalk',
      'html-minifier'
    ], {dev: true});
  }
};
