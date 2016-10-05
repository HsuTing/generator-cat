'use strict';

var generators = require('yeoman-generator');
var _ = require('lodash');
var extend = _.merge;

module.exports = generators.Base.extend({
  constructor: function() {
    this.option('email', {
      type: String,
      require: false,
      default: '',
      desc: 'Domain email'
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
  }
});
