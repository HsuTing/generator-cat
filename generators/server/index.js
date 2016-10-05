'use strict';

var generators = require('yeoman-generator');
var _ = require('lodash');
var extend = _.merge;

module.exports = generators.Base.extend({
  initializing: function() {
    this.props = {};
  },

  prompting: {
    chooseType: function() {
      return this.prompt([{
        type: 'list',
        name: 'type',
        message: 'Choose server type',
        choices: ['http', 'https'],
        default: 'http'
      }, {
        type: 'checkbox',
        name: 'middleware',
        message: 'Choose middleware',
        choices: [
          'cookie parser',
          'body parser',
          'connect multiparty'
        ]
      }]).then(function(props) {
        this.props = extend(this.props, props);
      }.bind(this));
    },

    addOtherOptions: function() {
      return this.prompt([{
        name: 'cookieIDs',
        message: 'Cookie names (comma to split)',
        when: this.props.middleware.indexOf('cookie parser') !== -1,
        filter: function(words) {
          return words.split(/\s*,\s*/g);
        }
      }]).then(function(props) {
        this.props = extend(this.props, props);
      }.bind(this));
    }
  },

  writing: function() {
    switch(this.props.type) {
      case 'http':
        this.fs.copyTpl(
          this.templatePath('http.js'),
          this.destinationPath('src/server.js'),
          this.props
        );
        break;

      case 'https':
        break;

      default:
        break;
    }
  },

  install: function() {
    const modules = ['express'];
    this.props.middleware.forEach(function(middleware) {
      modules.push(middleware.replace(/ /g, '-'));
    });

    switch(this.props.type) {
      case 'http':
        break;

      case 'https':
        break;

      default:
        break;
    }

    this.npmInstall(modules, {saveDev: true});
  }
});
