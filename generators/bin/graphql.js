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
        graphql: 'node ./bin/graphql.js'
      }
    }, currentPkg);
    this.fs.writeJSON(this.destinationPath('package.json'), pkg);

    // files
    this.fs.copy(
      this.templatePath('graphql.js'),
      this.destinationPath('bin/graphql.js')
    );
  }

  install() {
    this.yarnInstall([
      'graphql'
    ], {dev: true});
  }
};
