'use strict';

var generators = require('yeoman-generator');
var _ = require('lodash');
var extend = _.merge;
var addModules = require('./../addModules');

module.exports = generators.Base.extend({
  constructor: function() {
    generators.Base.apply(this, arguments);

    this.option('names', {
      type: String,
      require: false,
      default: '',
      desc: 'Name of files (comma to split)'
    });

    this.option('utils', {
      type: String,
      require: false,
      default: '',
      desc: 'Utils (comma to split)'
    });
  },

  initializing: function() {
    this.props = {
      names: this.options.names === '' ? [] : this.options.names.split(/\s*,\s*/g),
      utils: this.options.utils === '' ? [] : this.options.utils.split(/\s*,\s*/g)
    };

    if(this.config.get('pug:names'))
      this.props.names = this.config.get('pug:names');

    if(this.config.get('pug:utils'))
      this.props.utils = this.config.get('pug:utils');
  },

  prompting: {
    askForNames: function() {
      return this.prompt([{
        name: 'names',
        message: 'Name of files (comma to split)',
        when: this.props.names.length === 0,
        filter: function(words) {
          if(words === '')
            return [];

          return words.split(/\s*,\s*/g);
        }
      }]).then(function(props) {
        this.props = extend(this.props, props);

        this.config.set('pug:names', this.props.names);
      }.bind(this));
    },

    askForUtils: function() {
      return this.prompt([{
        type: 'checkbox',
        name: 'utils',
        message: 'Choose utils',
        choices: ['facebook'],
        when: this.props.utils.length === 0
      }]).then(function(props) {
        this.props = extend(this.props, props);

        this.config.set('pug:utils', this.props.utils);
      }.bind(this));
    },

    askForFacebook: function() {
      this.props.facebook = this.config.get('pug:facebook') || {};

      return this.prompt([{
        name: 'appId',
        message: 'Facebook appId',
        default: this.props.facebook.appId,
        when: this.props.utils.indexOf('facebook') !== -1 && !this.props.facebook.appId
      }, {
        name: 'version',
        message: 'Facebook api version',
        default: 'v2.7',
        when: this.props.utils.indexOf('facebook') !== -1 && !this.props.facebook.version
      }]).then(function(props) {
        this.props.facebook = extend(this.props.facebook, props);

        this.config.set('pug:facebook', this.props.facebook);
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

  default: function() {
    var modules = [
      'pug'
    ];

    this.config.set(
      'modules:dev',
      addModules(
        this.config.get('modules:dev'),
        modules
      )
    );
  }
});
