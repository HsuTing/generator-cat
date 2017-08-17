'use strict';

const Base = require('./../base');

module.exports = class extends Base {
  initializing() {
    this.addDevDependencies([
      'webpack',
      'webpack-dev-server',
      'babel-loader'
    ]);
  }

  writing() {
    const pkg = this.getPkg;

    this.writePkgScripts({
      'webpack-server': 'webpack-dev-server --content-base src --hot --inline',
      webpack: 'NODE_ENV=production webpack'
    });

    this.writeFiles({
      'webpack.config.js': ['webpack.config.js', {
        name: pkg.name,
        docs: this.checkPlugins('docs'),
        desktop_app: this.checkPlugins('desktop app'),
        relay: this.checkPlugins('relay')
      }]
    });
  }

  install() {
    this.addInstall();
  }
}
