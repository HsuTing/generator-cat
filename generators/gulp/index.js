'use strict';

var generators = require('yeoman-generator');
var _ = require('lodash');
var extend = _.merge;

module.exports = generators.Base.extend({
  constructor: function() {
    generators.Base.apply(this, arguments);

    this.option('babel', {
      type: Boolean,
      required: false,
      defaults: true,
      desc: 'Use babel'
    });

    this.option('eslint', {
      type: Boolean,
      required: false,
      defaults: true,
      desc: 'Use eslint'
    });

    this.option('static', {
      type: Boolean,
      required: false,
      defaults: true,
      desc: 'Use static render'
    });
  },

  writing: function() {
    this.fs.copyTpl(
      this.templatePath('gulpfile.js'),
      this.destinationPath('gulpfile.js'), {
        babel: this.options.babel,
        eslint: this.options.eslint,
        static: this.options.static
      }
    );
    this.fs.copy(
      this.templatePath('test.js'),
      this.destinationPath('gulp-tasks/test.js')
    );
  },

  install: function() {
    this.npmInstall([
      'gulp',
      'gulp-nsp',
      'gulp-exclude-gitignore',
      'gulp-mocha',
      'gulp-istanbul',
      'gulp-plumber',
      'gulp-require-tasks',
      'gulp-watch',
      'gulp-task-listing'
    ], {saveDev: true});
  }
});
