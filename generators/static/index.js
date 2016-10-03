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
      name: 'name',
      message: 'Main url',
      default: this.apppname
    }]).then(function(props) {
      this.props = extend(this.props, props);
    }.bind(this));
  },

  writing: function() {
    this.fs.copyTpl(
      this.templatePath('render.js'),
      this.destinationPath('gulp-tasks/render.js'), {
        router: this.options.router,
        redux: this.options.redux,
        radium: this.options.radium,
        name: this.props.name,
        componentName: this.props.name[0].toUpperCase() + this.props.name.slice(1)
      }
    );

    var currentPkg = this.fs.readJSON(this.destinationPath('package.json'), {});
    var pkg = extend({
      scripts: {
        render: 'rm -rf ./lib && babel src --out-dir lib && gulp render:html'
      }
    }, currentPkg);

    this.fs.writeJSON(this.destinationPath('package.json'), pkg);
  },

  install: function() {
    this.npmInstall([
      'gulp-pug',
      'gulp-rename'
    ], {saveDev: true});
  },

  end: function() {
    this.spawnCommand('npm', ['run', 'render']);
  }
});
