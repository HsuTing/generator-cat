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
        react: this.options.react
      }
    );
  },

  install: function() {
    var modules = [
      'babel-cli',
      'babel-plugin-transform-object-assign',
      'babel-plugin-transform-decorators-legacy',
      'babel-plugin-module-resolver',
      'babel-preset-latest',
      'babel-preset-stage-0'
    ];

    if(this.options.react)
      modules.push('babel-preset-react');

    this.npmInstall(modules, {saveDev: true});
  }
});
