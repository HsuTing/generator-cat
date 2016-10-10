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
          'connect multiparty',
          '(custom)info',
          '(custom)blacklist'
        ]
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

      default:
        break;
    }
  },

  install: function() {
    const modules = ['express', 'compression'];

    this.npmInstall(modules, {saveDev: true});
  }
});
