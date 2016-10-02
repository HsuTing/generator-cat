'use strict';

var generators = require('yeoman-generator');
var _ = require('lodash');
var extend = _.merge;

module.exports = generators.Base.extend({
  constructor: function() {
    generators.Base.apply(this, arguments);

    this.option('react', {
      type: Boolean,
      required: false,
      default: true,
      desc: 'Use React'
    });
  },

  writing: function() {
    this.fs.copyTpl(
      this.templatePath('babelrc'),
      this.destinationPath('.babelrc'), {
        react: this.options.react
      }
    );

    var currentPkg = this.fs.readJSON(this.destinationPath('package.json'), {});
    var pkg = extend({
      scripts: {
        build: 'rm -rf ./lib && babel src --out-dir lib -w'
      }
    }, currentPkg);

    this.fs.writeJSON(this.destinationPath('package.json'), pkg);
  },

  install: function() {
    if(this.options.react)
      this.npmInstall([
        'babel-cli',
        'babel-plugin-transform-object-assign',
        'babel-preset-latest',
        'babel-preset-stage-0',
        'babel-preset-react'
      ], {saveDev: true});
    else
      this.npmInstall([
        'babel-cli',
        'babel-plugin-transform-object-assign',
        'babel-preset-latest',
        'babel-preset-stage-0'
      ], {saveDev: true});
  }
});
