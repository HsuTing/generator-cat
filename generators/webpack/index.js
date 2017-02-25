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
    const graphql = this.props.plugins.indexOf('graphql') !== -1;
    // pkg
    const currentPkg = this.fs.readJSON(this.destinationPath('package.json'), {});
    const pkg = extend({
      scripts: {
        'webpack-server': `${graphql ? 'export BABEL_ENV=graphql && ': ''}webpack-dev-server --content-base src --hot --inline`,
        webpack: `${graphql ? 'export BABEL_ENV=graphql && ': ''}NODE_ENV=production webpack`
      }
    }, currentPkg);
    this.fs.writeJSON(this.destinationPath('package.json'), pkg);

    // files
    this.fs.copyTpl(
      this.templatePath('webpack.config.js'),
      this.destinationPath('webpack.config.js'), {
        graphql: this.props.plugins.indexOf('graphql') !== -1,
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
    ]);
  }
};
