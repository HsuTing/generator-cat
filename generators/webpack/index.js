'use strict';

const Generator = require('yeoman-generator');
const _ = require('lodash');
const extend = _.merge;

module.exports = class extends Generator {
  initializing() {
    this.props = {
      plugins: this.config.get('plugins') || []
    };
  }

  writing() {
    // pkg
    const currentPkg = this.fs.readJSON(this.destinationPath('package.json'), {});
    const pkg = extend({
      scripts: {
        'webpack-server': 'webpack-dev-server --content-base src --hot --inline',
        webpack: 'NODE_ENV=production webpack'
      }
    }, currentPkg);
    this.fs.writeJSON(this.destinationPath('package.json'), pkg);

    // files
    this.fs.copyTpl(
      this.templatePath('webpack.config.js'),
      this.destinationPath('webpack.config.js'), {
        router: this.props.plugins.indexOf('router') !== -1,
        redux: this.props.plugins.indexOf('redux') !== -1
      }
    );
  }

  install() {
    this.yarnInstall([
      'webpack',
      'webpack-dev-server',
      'babel-loader'
    ], {dev: true});
  }
};
