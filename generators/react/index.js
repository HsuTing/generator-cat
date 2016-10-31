'use strict';

var generators = require('yeoman-generator');
var addModules = require('./../addModules');

module.exports = generators.Base.extend({
  constructor: function() {
    generators.Base.apply(this, arguments);

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
  },

  initializing: function() {
    this.props = {
      names: this.config.get('names') || [],
      router: this.options.router,
      redux: this.options.redux
    };
  },

  writing: function() {
    // copy files
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

    this.fs.copy(
      this.templatePath('Style.js'),
      this.destinationPath('src/components/share/Style.js')
    );

    if(this.props.router) {
      this.fs.copy(
        this.templatePath('radium/Link.js'),
        this.destinationPath('src/components/share/radium/Link.js')
      );
    }
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

    if(this.props.redux) {
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
