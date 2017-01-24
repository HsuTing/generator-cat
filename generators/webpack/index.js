'use strict';

const generator = require('yeoman-generator');
const _ = require('lodash');
const extend = _.merge;

module.exports = generator.extend({
  initializing: function() {
    this.props = {
      plugins: this.config.get('plugins') || []
    };
  },

  writing: function() {
    // write package.json
    const currentPkg = this.fs.readJSON(this.destinationPath('package.json'), {});
    const pkg = extend({
      scripts: {
        'webpack-server': 'webpack-dev-server --content-base src --hot --inline',
        webpack: 'NODE_ENV=production webpack'
      }
    }, currentPkg);
    this.fs.writeJSON(this.destinationPath('package.json'), pkg);

    // copy files
    this.fs.copyTpl(
      this.templatePath('webpack.config.js'),
      this.destinationPath('webpack.config.js'), {
        router: this.props.plugins.indexOf('router') !== -1,
        redux: this.props.plugins.indexOf('redux') !== -1
      }
    );
  },

  install: function() {
    if(this.options.skipInstall)
      return;

    const modules = [
      'add',
      'webpack',
      'webpack-dev-server',
      'babel-loader'
    ];

    modules.push('--dev');
    this.spawnCommandSync('yarn', modules);
  }
});
