'use strict';

var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
  constructor: function() {
    generators.Base.apply(this, arguments);

    this.option('skipInstall', {
      type: Boolean,
      require: false,
      default: false,
      desc: 'skip install'
    });
  },

  writing: function() {
    this.fs.copy(
      this.templatePath('gulpfile.js'),
      this.destinationPath('gulpfile.js')
    );
    this.fs.copy(
      this.templatePath('README.md'),
      this.destinationPath('gulp-tasks/README.md')
    );
  },

  install: function() {
    if(this.options.skipInstall)
      return;

    this.npmInstall([
      'gulp',
      'gulp-require-tasks'
    ], {saveDev: true});
  }
});
