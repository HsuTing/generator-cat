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
  },

  default: function() {
    this.composeWith('cat:server', {
      options: {
        email: this.options.email
      }
    });

    this.composeWith('cat:pug', {
      options: {
        test: true,
        projectName: 'test-page',
        type: 'Dynamic pages',
        skipInstall: this.options.skipInstall
      }
    }, {
      local: require.resolve('../pug')
    });

    this.composeWith('cat:pug', {
      options: {
        test: false,
        projectName: 'page',
        type: 'Dynamic pages',
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
