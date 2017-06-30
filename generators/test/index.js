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
        test: 'yarn babel && istanbul cover _mocha -- -R spec test/**/*.js'
      }
    }, currentPkg);
    this.fs.writeJSON(this.destinationPath('package.json'), pkg);

    // files
    this.fs.copy(
      this.templatePath('index.js'),
      this.destinationPath('test/index.js')
    );
  }

  install() {
    this.yarnInstall([
      'istanbul',
      'should',
      'mocha'
    ], {dev: true});
  }
};
