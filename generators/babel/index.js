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
    this.fs.copy(
      this.templatePath('gulpfile.js'),
      this.destinationPath('gulp-tasks/babel.js')
    );
  },

  install: function() {
    if(this.options.react)
      this.npmInstall([
        'gulp-babel',
        'gulp-clean',
        'babel-plugin-transform-object-assign',
        'babel-preset-latest',
        'babel-preset-stage-0',
        'babel-preset-react'
      ], {saveDev: true});
    else
      this.npmInstall([
        'gulp-babel',
        'gulp-clean',
        'babel-plugin-transform-object-assign',
        'babel-preset-latest',
        'babel-preset-stage-0'
      ], {saveDev: true});
  }
});
