'use strict';

var generators = require('yeoman-generator');
var _ = require('lodash');
var extend = _.merge;
var addModules = require('./../addModules');

module.exports = generators.Base.extend({
  constructor: function() {
    generators.Base.apply(this, arguments);

    this.option('react', {
      type: Boolean,
      required: false,
      default: false,
      desc: 'Use react'
    });
  },

  initializing: function() {
    this.props = {
      alias: this.config.get('alias') || [],
      react: this.options.react
    };
  },

  write: function() {
    // write package.json
    var currentPkg = this.fs.readJSON(this.destinationPath('package.json'), {});

    var pkg = extend({
      scripts: {
        babel: 'rm -rf ./lib && babel src --out-dir lib',
        'babel:watch': 'rm -rf ./lib && babel -w src --out-dir lib'
      }
    }, currentPkg);

    this.fs.writeJSON(this.destinationPath('package.json'), pkg);

    // copy files
    this.fs.copyTpl(
      this.templatePath('babelrc'),
      this.destinationPath('.babelrc'), {
        react: this.props.react,
        alias: this.props.alias
      }
    );
  },

  default: function() {
    var modules = [
      'babel-cli',
      'babel-core',
      'babel-plugin-transform-object-assign',
      'babel-plugin-module-resolver',
      'babel-preset-latest',
      'babel-preset-stage-0'
    ];

    if(this.props.react) {
      modules.push(
        'babel-preset-react',
        'babel-plugin-transform-decorators-legacy'
      );
    }

    this.config.set(
      'modules:dev',
      addModules(
        this.config.get('modules:dev'),
        modules
      )
    );
  }
});
