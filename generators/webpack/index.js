'use strict';

var generators = require('yeoman-generator');
var _ = require('lodash');
var extend = _.merge;
var addModules = require('./../addModules');

module.exports = generators.Base.extend({
  constructor: function() {
    generators.Base.apply(this, arguments);

    this.option('router', {
      type: Boolean,
      required: false,
      default: false,
      desc: 'Use react-router'
    });

    this.option('redux', {
      type: Boolean,
      required: false,
      default: false,
      desc: 'Use redux and react-redux'
    });
  },

  initializing: function() {
    this.props = {
      names: this.config.get('names') || [],
      router: this.options.router,
      redux: this.options.redux
    };
  },

  writing: function() {
    // write package.json
    var currentPkg = this.fs.readJSON(this.destinationPath('package.json'), {});
    var pkg = extend({
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
        names: this.props.names,
        router: this.props.router,
        redux: this.props.redux
      }
    );
  },

  default: function() {
    var modules = [
      'webpack',
      'webpack-dev-server',
      'babel-loader'
    ];

    this.config.set(
      'modules:dev',
      addModules(
        this.config.get('modules:dev'),
        modules
      )
    );
  }
});
