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
      name: 'name',
      message: 'Main controller name',
      default: 'index'
    }, {
      name: 'url',
      message: 'Main url',
      default: this.appname,
      when: this.option.router
    }]).then(function(props) {
      this.props = extend(this.props, props);
    }.bind(this));
  },

  writing: function() {
    this.fs.copyTpl(
      this.templatePath('gulpfile.js'),
      this.destinationPath('gulp-tasks/static.js'), {
        router: this.options.router,
        redux: this.options.redux,
        radium: this.options.radium,
        url: this.props.url,
        name: this.props.name,
        componentName: this.props.name[0].toUpperCase() + this.props.name.slice(1)
      }
    );

    var currentPkg = this.fs.readJSON(this.destinationPath('package.json'), {});
    var pkg = extend({
      scripts: {
        build: 'NODE_ENV=1 gulp build'
      },
      'pre-commit': []
    }, currentPkg);

    if(pkg['pre-commit'].indexOf('build') === -1) {
      pkg['pre-commit'].push('build');
    }

    this.fs.writeJSON(this.destinationPath('package.json'), pkg);
  },

  default: function() {
    this.composeWith('cat:gulp', {
      options: {
        react: true,
        skipInstall: this.options.skipInstall
      }
    }, {
      local: require.resolve('../gulp')
    });

    this.composeWith('cat:pug', {
      options: {
        test: true,
        projectName: 'test-page',
        skipInstall: this.options.skipInstall
      }
    }, {
      local: require.resolve('../pug')
    });

    this.composeWith('cat:pug', {
      options: {
        test: false,
        projectName: 'page',
        skipInstall: this.options.skipInstall
      }
    }, {
      local: require.resolve('../pug')
    });
  },

  install: function() {
    this.npmInstall([
      'gulp-pug',
      'gulp-rename',
      'pre-commit'
    ], {saveDev: true});
  },

  end: function() {
    this.spawnCommand('gulp', ['build']);
  }
});
