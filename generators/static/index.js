'use strict';

var generators = require('yeoman-generator');
var _ = require('lodash');
var extend = _.merge;

module.exports = generators.Base.extend({
  constructor: function() {
    generators.Base.apply(this, arguments);

    this.props = {};
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

  prompting: function() {
    return this.prompt([{
      type: 'input',
      name: 'url',
      message: 'Main url',
      default: this.appname
    }]).then(function(props) {
      this.props = extend(this.props, props);
    }.bind(this));
  },

  writing: function() {
    this.fs.copyTpl(
      this.templatePath('gulpfile.js'),
      this.destinationPath('gulp-tasks/render.js'), {
        router: this.options.router,
        redux: this.options.redux,
        radium: this.options.radium,
        url: this.props.url,
        componentName: this.props.name[0].toUpperCase() + this.props.name.slice(1)
      }
    );
  },

  install: function() {
    this.npmInstall([
      'gulp-pug',
      'gulp-rename'
    ], {saveDev: true});
  },

  end: function() {
    this.spawnCommand('gulp', ['render']);
  }
});
