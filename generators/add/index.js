'use strict';

var generators = require('yeoman-generator');
var _ = require('lodash');
var extend = _.merge;

module.exports = generators.Base.extend({
  initializing: function() {
    this.props = {};
  },

  prompting: {
    askForModules: function() {
      return this.prompt([{
        type: 'list',
        name: 'module',
        message: 'Choose you need',
        choices: [
          'reducer(redux)',
          'store(redux)',
          'react-router',
          'react-redux and react-router',
          'bot',
          'graphQL',
          'paypal',
          'allpay',
          'cart',
          'google drive',
          'firebase'
        ]
      }]).then(function(props) {
        this.props = extend(this.props, props);
      }.bind(this));
    },

    askForName: function() {
      var isNeeded = false;
      [
        'reducer(redux)',
        'store(redux)',
        'react-router',
        'react-redux and react-router'
      ].forEach(function(module) {
        if(this.props.module === module)
          isNeeded = true;
      }.bind(this));

      return this.prompt([{
        name: 'name',
        message: 'File name',
        when: isNeeded,
        default: 'index'
      }]).then(function(props) {
        this.props = extend(this.props, props);
      }.bind(this));
    }
  },

  writing: function() {
    switch(this.props.module) {
      case 'reducer(redux)':
        this.fs.copyTpl(
          this.templatePath('reducer.js'),
          this.destinationPath('src/reducers/' + this.props.name + '.js'), {
            name: this.props.name
          }
        );
        this.fs.copy(
          this.templatePath('action.js'),
          this.destinationPath('src/actions/' + this.props.name + '.js')
        );
        break;

      case 'store(redux)':
        this.fs.copy(
          this.templatePath('store.js'),
          this.destinationPath('src/stores/' + this.props.name + '.js')
        );
        break;

      case 'react-router':
        this.fs.copy(
          this.templatePath('router.js'),
          this.destinationPath('src/containers/' + this.props.name + '.js')
        );
        break;

      case 'react-redux and react-router':
        this.fs.copyTpl(
          this.templatePath('redux-router.js'),
          this.destinationPath('src/containers/' + this.props.name + '.js'), {
            name: this.props.name
          }
        );
        break;

      default:
        break;
    }
  },

  default: function() {
    this.log(this.props);
  }
});
