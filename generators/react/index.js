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
      default: 'index',
      desc: 'Main js names (comma to split)'
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
        message: 'Main js names (comma to split)',
        default: 'index',
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
    this.props.names.forEach(function(name) {
      var componentName = name[0].toUpperCase() + name.slice(1).toLowerCase();

      this.fs.copyTpl(
        this.templatePath('component.js'),
        this.destinationPath('src/components/' + name + '/' + componentName + '.js'), {
          name: name,
          componentName: componentName
        }
      );

      this.fs.copyTpl(
        this.templatePath('public.js'),
        this.destinationPath('src/public/' + name + '.js'), {
          name: name,
          componentName: componentName
        }
      );
    }.bind(this));

    this.fs.copy(
      this.templatePath('radium/Wrapper.js'),
      this.destinationPath('src/components/share/radium/Wrapper.js')
    );

    if(this.props.router) {
      this.fs.copy(
        this.templatePath('radium/Link.js'),
        this.destinationPath('src/components/share/radium/Link.js')
      );
    }

    this.fs.copy(
      this.templatePath('Style.js'),
      this.destinationPath('src/components/share/Style.js')
    );
  },

  default: function() {
    var modules = [
      'react',
      'react-dom',
      'radium',
      'radium-normalize'
    ];

    if(this.props.router) {
      modules.push('react-router');
    }

    if(this.props.redux !== -1) {
      modules.push(
        'redux',
        'react-redux'
      );
    }

    this.config.set(
      'modules',
      addModules(
        this.config.get('modules'),
        modules
      )
    );
  }
});
