'use strict';

var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
  constructor: function() {
    generators.Base.apply(this, arguments);

    this.option('router', {
      type: Boolean,
      required: false,
      default: true,
      desc: 'Use React-router or not(default: true)'
    });

    this.option('redux', {
      type: Boolean,
      required: false,
      default: true,
      desc: 'Use React-redux or not(default: true)'
    });

    this.option('radium', {
      type: Boolean,
      required: false,
      default: true,
      desc: 'Use Radium or not(default: true)'
    });

    this.option('name', {
      type: String,
      required: false,
      default: 'index',
      desc: 'Filename'
    });

    this.option('reducerName', {
      type: String,
      required: false,
      default: 'data',
      desc: 'reducer name'
    });
  },

  writing: function() {
    var componentName = this.options.name[0].toUpperCase() + this.options.name.slice(1);

    this.fs.copyTpl(
      this.templatePath('components.js'),
      this.destinationPath('src/components/' + componentName + '.js'), {
        componentName: componentName
      }
    );
    this.fs.copyTpl(
      this.templatePath('public.js'),
      this.destinationPath('src/public/' + this.options.name + '.js'), {
        name: this.options.name,
        componentName: componentName,
        redux: this.options.redux,
        router: this.options.router,
        radium: this.options.radium
      }
    );

    if(this.options.router) {
      this.fs.copyTpl(
        this.templatePath('routers.js'),
        this.destinationPath('src/routers/' + this.options.name + '.js'), {
          name: this.options.name,
          componentName: componentName,
          redux: this.options.redux
        }
      );
    }

    if(this.options.redux) {
      this.fs.copy(
        this.templatePath('actions.js'),
        this.destinationPath('src/actions/' + this.options.reducerName + '.js')
      );
      this.fs.copyTpl(
        this.templatePath('reducers.js'),
        this.destinationPath('src/reducers/' + this.options.reducerName + '.js'), {
          reducerName: this.options.reducerName
        }
      );
      this.fs.copyTpl(
        this.templatePath('stores.js'),
        this.destinationPath('src/stores/' + this.options.name + '.js'), {
          reducerName: this.options.reducerName
        }
      );
    }

    if(this.options.radium) {
      if(this.options.router) {
        this.fs.copy(
          this.templatePath('radium/Link.js'),
          this.destinationPath('src/components/radium/Link.js')
        );
      }
      this.fs.copy(
        this.templatePath('radium/Wrapper.js'),
        this.destinationPath('src/components/radium/Wrapper.js')
      );
    }
  },

  install: function() {
    var packages = [
      'react',
      'react-dom'
    ];

    if(this.options.router) {
      packages.push('react-router');
    }

    if(this.options.redux) {
      packages.push('redux');
      packages.push('react-redux');
    }

    if(this.options.radium) {
      packages.push('radium');
      packages.push('radium-normalize');
    }

    this.npmInstall(packages);
  }
});
