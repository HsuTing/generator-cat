'use strict';

var generators = require('yeoman-generator');
var _ = require('lodash');
var extend = _.merge;

module.exports = generators.Base.extend({
  constructor: function() {
    generators.Base.apply(this, arguments);

    this.option('name', {
      type: String,
      required: true,
      default: true,
      desc: 'Project name'
    });

    this.option('react', {
      type: Boolean,
      required: false,
      default: true,
      desc: 'Use React'
    });

    this.option('router', {
      type: Boolean,
      required: false,
      default: true,
      desc: 'Use React-router'
    });

    this.option('redux', {
      type: Boolean,
      required: false,
      default: true,
      desc: 'Use React-redux'
    });

    this.option('radium', {
      type: Boolean,
      required: false,
      default: true,
      desc: 'Use Radium'
    });
  },

  initializing: function() {
    this.props = {};
  },

  prompting: function() {
    return this.prompt([{
      type: 'input',
      name: 'name',
      message: 'Main controller name',
      default: 'index'
    }, {
      type: 'input',
      name: 'reducerName',
      message: 'Reducer names (comma to split)',
      default: 'data',
      when: this.options.redux,
      filter: function(words) {
        return words.split(/\s*,\s*/g);
      }
    }]).then(function(props) {
      this.props = extend(this.props, props);
    }.bind(this));
  },

  writing: function() {
    var componentName = this.props.name[0].toUpperCase() + this.props.name.slice(1);

    if(this.options.react) {
      this.fs.copyTpl(
        this.templatePath('components.js'),
        this.destinationPath('src/components/' + componentName + '.js'), {
          componentName: componentName
        }
      );
      this.fs.copyTpl(
        this.templatePath('public.js'),
        this.destinationPath('src/public/' + this.props.name + '.js'), {
          name: this.props.name,
          componentName: componentName,
          redux: this.options.redux,
          router: this.options.router,
          radium: this.options.radium
        }
      );
    }

    if(this.options.router) {
      this.fs.copyTpl(
        this.templatePath('routers.js'),
        this.destinationPath('src/routers/' + this.props.name + '.js'), {
          projectName: this.options.name,
          name: this.props.name,
          componentName: componentName,
          redux: this.options.redux
        }
      );
    }

    if(this.options.redux) {
      this.props.reducerName.forEach(function(reducerName) {
        this.fs.copy(
          this.templatePath('actions.js'),
          this.destinationPath('src/actions/' + reducerName + '.js')
        );
        this.fs.copyTpl(
          this.templatePath('reducers.js'),
          this.destinationPath('src/reducers/' + reducerName + '.js'), {
            reducerName: reducerName
          }
        );
      }.bind(this));
      this.fs.copyTpl(
        this.templatePath('stores.js'),
        this.destinationPath('src/stores/' + this.props.name + '.js'), {
          reducerName: this.props.reducerName
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

    this.npmInstall(packages, {save: true});
  }
});
