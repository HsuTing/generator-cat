'use strict';

var generators = require('yeoman-generator');
var _ = require('lodash');
var extend = _.merge;

module.exports = generators.Base.extend({
  writing: function() {
    this.fs.copy(
      this.templatePath('gulpfile.js'),
      this.destinationPath('gulpfile.js')
    );
    this.fs.copy(
      this.templatePath('README.md'),
      this.destinationPath('gulp-tasks/README.md')
    );

    var currentPkg = this.fs.readJSON(this.destinationPath('package.json'), {});
    var pkg = extend({
      scripts: {
        prepublish: 'gulp prepublish'
      }
    }, currentPkg);

    this.fs.writeJSON(this.destinationPath('package.json'), pkg);
  },

  install: function() {
    this.npmInstall([
      'gulp',
      'gulp-nsp',
      'gulp-exclude-gitignore',
      'gulp-mocha',
      'gulp-istanbul',
      'gulp-plumber',
      'gulp-require-tasks'
    ], {saveDev: true});
  }
});
