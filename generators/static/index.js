'use strict';

var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
  constructor: function() {
    generators.Base.apply(this, arguments);

    this.option('router', {
      type: Boolean,
      required: false,
      default: true,
      desc: 'Use React-router'
    });

    this.option('redux', {
      type: Boolean,
      required: false,
      default: true,
      desc: 'Use React-redux'
    });

    this.option('radium', {
      type: Boolean,
      required: false,
      default: true,
      desc: 'Use Radium'
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
