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
        lint: 'eslint --cache ./src ./bin --ext .js',
        'lint:watch': 'esw --cache ./src ./bin --ext .js -w --color'
      }
    }, currentPkg);

    this.fs.writeJSON(this.destinationPath('package.json'), pkg);

    // copy files
    this.fs.copyTpl(
      this.templatePath('eslintrc.js'),
      this.destinationPath('.eslintrc.js'), {
        react: this.props.react,
        alias: this.props.alias
      }
    );
  },

  default: function() {
    var modules = [
      'eslint',
      'eslint-watch',
      'eslint-config-google',
      'eslint-plugin-import',
      'eslint-import-resolver-babel-module',
      'babel-eslint'
    ];

    if(this.props.react)
      modules.push('eslint-plugin-react');

    this.config.set(
      'modules:dev',
      addModules(
        this.config.get('modules:dev'),
        modules
      )
    );
  }
});
