'use strict';

var generators = require('yeoman-generator');
var _ = require('lodash');
var extend = _.merge;

module.exports = generators.Base.extend({
  constructor: function() {
    generators.Base.apply(this, arguments);

    this.option('router', {
      type: Boolean,
      required: false,
      default: true,
      desc: 'Use React-router or not(default: true)'
    });

    this.option('redux', {
      type: Boolean,
      required: false,
      default: true,
      desc: 'Use React-redux or not(default: true)'
    });

    this.option('radium', {
      type: Boolean,
      required: false,
      default: true,
      desc: 'Use Radium or not(default: true)'
    });
  },

  writing: function() {
    this.fs.copyTpl(
      this.templatePath('webpack.config.js'),
      this.destinationPath('webpack.config.js'), {
        router: this.options.router,
        redux: this.options.redux,
        radium: this.options.radium
      }
    );

    var currentPkg = this.fs.readJSON(this.destinationPath('package.json'), {});
    var pkg = extend({
      scripts: {
        'webpack-server': 'webpack-dev-server --content-base src --hot --progress --inline',
        webpack: 'NODE_ENV=1 webpack'
      }
    }, currentPkg);

    this.fs.writeJSON(this.destinationPath('package.json'), pkg);
  },

  install: function() {
    this.npmInstall([
      'webpack',
      'webpack-dev-server',
      'babel-loader'
    ], {saveDev: true});
  }
});
