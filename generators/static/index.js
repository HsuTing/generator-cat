'use strict';

var generators = require('yeoman-generator');

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
      this.templatePath('render.js'),
      this.destinationPath('gulp-tasks/render.js'), {
        router: this.options.router,
        redux: this.options.redux,
        radium: this.options.radium
      }
    );
  }
});
