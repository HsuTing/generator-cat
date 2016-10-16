'use strict';

var generators = require('yeoman-generator');
var _ = require('lodash');
var extend = _.merge;

module.exports = generators.Base.extend({
  constructor: function() {
    generators.Base.apply(this, arguments);

    this.option('webpack', {
      type: Boolean,
      required: false,
      defaults: false,
      desc: 'Include webpack'
    });

    this.option('name', {
      type: String,
      required: false,
      default: '',
      desc: 'Main component name'
    });

    this.option('modules', {
      type: Array,
      required: false,
      default: [],
      desc: 'Modules'
    });
  },

  initializing: function() {
    var pkg = this.fs.readJSON(this.destinationPath('package.json'), {});

    this.props = {
      modules: this.options.modules,
      name: this.options.name
    };
  },

  prompting: {
    chooseModules: function() {
      return this.prompt([{
        type: 'checkbox',
        name: 'modules',
        message: 'Choose modules',
        choices: ['router', 'redux', 'radium', {name: 'default component', checked: true}],
        when: this.options.modules.length === 0
      }]).then(function(props) {
        this.props = extend(this.props, props);
      }.bind(this));
    },

    getName: function() {
      return this.prompt([{
        name: 'name',
        message: 'Main component name',
        default: 'index',
        when: this.options.name === ''
      }, {
        name: 'reducerName',
        message: 'Reducer names (comma to split)',
        default: 'data',
        when: this.props.modules.indexOf('redux') !== -1,
        filter: function(words) {
          return words.split(/\s*,\s*/g);
        }
      }]).then(function(props) {
        this.props = extend(this.props, props);
      }.bind(this));
    }
  },

  writing: function() {
    var componentName = this.props.name[0].toUpperCase() + this.props.name.slice(1);

    if(this.props.modules.indexOf('default component') !== -1) {
      this.fs.copyTpl(
        this.templatePath('components.js'),
        this.destinationPath('src/components/' + this.props.name + '/' + componentName + '.js'), {
          componentName: componentName,
          radium: this.props.modules.indexOf('radium') !== -1
        }
      );
      this.fs.copyTpl(
        this.templatePath('public.js'),
        this.destinationPath('src/public/' + this.props.name + '.js'), {
          name: this.props.name,
          componentName: componentName,
          redux: this.props.modules.indexOf('redux') !== -1,
          router: this.props.modules.indexOf('router') !== -1,
          radium: this.props.modules.indexOf('radium') !== -1
        }
      );
    }

    if(this.props.modules.indexOf('router') !== -1) {
      this.fs.copyTpl(
        this.templatePath('routers.js'),
        this.destinationPath('src/routers/' + this.props.name + '.js'), {
          name: this.props.name,
          componentName: componentName,
          redux: this.props.modules.indexOf('redux') !== -1
        }
      );
    }

    if(this.props.modules.indexOf('redux') !== -1) {
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

    if(this.props.modules.indexOf('radium') !== -1) {
      if(this.props.modules.indexOf('router') !== -1) {
        this.fs.copy(
          this.templatePath('radium/Link.js'),
          this.destinationPath('src/components/radium/Link.js')
        );
      }
      this.fs.copy(
        this.templatePath('radium/Wrapper.js'),
        this.destinationPath('src/components/radium/Wrapper.js')
      );
      this.fs.copy(
        this.templatePath('Style.js'),
        this.destinationPath('src/components/share/Style.js')
      );
    }
  },

  default: function() {
    if(this.options.webpack) {
      this.composeWith('cat:webpack', {
        options: {
          name: this.props.name,
          router: this.props.modules.indexOf('router') !== -1,
          redux: this.props.modules.indexOf('redux') !== -1,
          radium: this.props.modules.indexOf('radium') !== -1,
          skipInstall: this.options.skipInstall
        }
      }, {
        local: require.resolve('../webpack')
      });
    }
  },

  install: function() {
    var packages = [
      'react',
      'react-dom'
    ];

    if(this.props.modules.indexOf('router') !== -1) {
      packages.push('react-router');
    }

    if(this.props.modules.indexOf('redux') !== -1) {
      packages.push('redux');
      packages.push('react-redux');
    }

    if(this.props.modules.indexOf('radium') !== -1) {
      packages.push('radium');
      packages.push('radium-normalize');
    }

    this.npmInstall(packages, {save: true});
  }
});
