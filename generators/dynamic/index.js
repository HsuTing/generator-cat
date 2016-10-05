'use strict';

var generators = require('yeoman-generator');
var _ = require('lodash');
var extend = _.merge;

module.exports = generators.Base.extend({
  constructor: function() {
    generators.Base.apply(this, arguments);

    this.option('email', {
      type: String,
      require: false,
      default: '',
      desc: 'Domain email'
    });

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
    var currentPkg = this.fs.readJSON(this.destinationPath('package.json'), {});
    var pkg = extend({
      scripts: {
        'dev-server': 'node ./lib/server.js',
        start: 'NODE_EVN=1 ./lib/server.js',
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
    this.composeWith('cat:server', {
      options: {
        email: this.options.email
      }
    });

    this.composeWith('cat:gulp', {
      options: {
        react: true,
        static: false,
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

  end: function() {
    this.spawnCommand('gulp', ['build']);
  }
});
