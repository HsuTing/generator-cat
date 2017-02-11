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
        graphql: 'rm -rf ./lib/schemas && babel src/schemas --out-dir lib/schemas && build-graphql ./lib/schemas/schema'
      }
    }, currentPkg);
    this.fs.writeJSON(this.destinationPath('package.json'), pkg);
  }

  install() {
    this.yarnInstall([
      'cat-graphql'
    ], {dev: true});
  }
};
