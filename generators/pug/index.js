'use strict';

var generators = require('yeoman-generator');
var _ = require('lodash');
var extend = _.merge;

module.exports = generators.Base.extend({
  initializing: function() {
    this.props = {
      names: this.config.get('names') || []
    };
  },

  prompting: {
    askForUtils: function() {
      return this.prompt([{
        type: 'checkbox',
        name: 'utils',
        message: 'Choose utils',
        choices: ['facebook'],
        store: true
      }]).then(function(props) {
        this.props = extend(this.props, props);
      }.bind(this));
    },

    askForFacebook: function() {
      if(this.props.utils.indexOf('facebook') === -1)
        return;

      return this.prompt([{
        name: 'appId',
        message: 'Facebook appId',
        store: true
      }, {
        name: 'version',
        message: 'Facebook api version',
        store: true
      }]).then(function(props) {
        this.props.facebook = extend(this.props.facebook, props);
      }.bind(this));
    }
  },

  write: function() {
    this.props.names.forEach(function(name) {
      this.fs.copyTpl(
        this.templatePath('page.pug'),
        this.destinationPath('views/' + name + '.pug'), {
          name: name,
          utils: this.props.utils
        }
      );
    }.bind(this));

    this.props.utils.concat([
      'head'
    ]).forEach(function(util) {
      this.fs.copyTpl(
        this.templatePath('utils/' + util + '.pug'),
        this.destinationPath('views/utils/' + util + '.pug'),
        this.props[util] || {}
      );
    }.bind(this));
  },

  install: function() {
    if(this.options.skipInstall)
      return;

    this.spawnCommandSync('yarn', ['add', 'pug', '--dev']);
  }
});
