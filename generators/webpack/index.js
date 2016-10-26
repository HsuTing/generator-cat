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
      required: false,
      default: '',
      desc: 'Entry files in webpack (comma to split)'
    });

    this.option('router', {
      type: Boolean,
      required: false,
      default: false,
      desc: 'Use react-router'
    });

    this.option('redux', {
      type: Boolean,
      required: false,
      default: false,
      desc: 'Use redux and react-redux'
    });

    this.config.set('react', true);
  },

  initializing: function() {
    this.props = {
      names: this.options.names === '' ? [] : this.options.names.split(/\s*,\s*/g),
      router: this.options.router,
      redux: this.options.redux
    };

    if(this.config.get('js'))
      this.props.names = this.config.get('js');

    if(this.config.get('router'))
      this.props.router = this.config.get('router');

    if(this.config.get('redux'))
      this.props.redux = this.config.get('redux');
  },

  prompting: {
    askForNames: function() {
      return this.prompt([{
        name: 'names',
        message: 'Entry files in webpack (comma to split)',
        when: this.props.names.length === 0,
        filter: function(words) {
          if(words === '')
            return [];

          return words.split(/\s*,\s*/g);
        }
      }]).then(function(props) {
        this.props = extend(this.props, props);

        this.config.set('js', this.props.names);
      }.bind(this));
    },

    askForModules: function() {
      return this.prompt([{
        type: 'confirm',
        name: 'router',
        message: 'Use react-router',
        default: true,
        when: !this.props.router
      }, {
        type: 'confirm',
        name: 'redux',
        message: 'Use redux and react-redux',
        default: true,
        when: !this.props.redux
      }]).then(function(props) {
        this.props = extend(this.props, props);

        this.config.set('router', this.props.router);
        this.config.set('redux', this.props.redux);
      }.bind(this));
    }
  },

  writing: function() {
    this.fs.copyTpl(
      this.templatePath('webpack.config.js'),
      this.destinationPath('webpack.config.js'), {
        names: this.props.names,
        router: this.props.router,
        redux: this.props.redux
      }
    );

    var currentPkg = this.fs.readJSON(this.destinationPath('package.json'), {});
    var pkg = extend({
      scripts: {
        'webpack-server': 'webpack-dev-server --content-base src --hot --inline',
        webpack: 'NODE_ENV=1 webpack'
      }
    }, currentPkg);

    this.fs.writeJSON(this.destinationPath('package.json'), pkg);
  },

  default: function() {
    var modules = [
      'webpack',
      'webpack-dev-server',
      'babel-loader'
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
