'use strict';

var generators = require('yeoman-generator');
var _ = require('lodash');
var extend = _.merge;

module.exports = generators.Base.extend({
  initializing: function() {
    var pkg = this.fs.readJSON(this.destinationPath('package.json'), {});

    this.props = {
      hostname: pkg.name
    };
  },

  prompting: function() {
    return this.prompt([{
      type: 'checkbox',
      name: 'modules',
      message: 'Choose modules',
      choices: ['router', 'redux', 'radium', {name: 'default component', checked: true}]
    }, {
      name: 'name',
      message: 'Main component name',
      default: 'index'
    }]).then(function(props) {
      this.props = extend(this.props, props);
    }.bind(this));
  },

  writing: function() {
    // write package.json
    var currentPkg = this.fs.readJSON(this.destinationPath('package.json'), {});
    var pkg = extend({
      scripts: {
        build: 'npm run babel && npm run static'
      },
      'pre-commit': [
        'webpack',
        'lint'
      ]
    }, currentPkg);

    this.fs.writeJSON(this.destinationPath('package.json'), pkg);

    // copy files
    this.fs.copy(
      this.templatePath('static.js'),
      this.destinationPath('tools/static.js')
    );

    this.fs.copyTpl(
      this.templatePath('config.js'),
      this.destinationPath('static.config.js'), {
        router: this.props.modules.indexOf('router'),
        redux: this.props.modules.indexOf('redux'),
        radium: this.props.modules.indexOf('radium'),
        name: this.props.name,
        componentName: this.props.name[0].toUpperCase() + this.props.name.slice(1)
      }
    );
  },

  default: function() {
    this.composeWith('cat:react', {
      options: {
        name: this.props.name,
        modules: this.props.modules,
        webpack: true,
        skipInstall: this.options.skipInstall
      }
    }, {
      local: require.resolve('../react')
    });

    this.composeWith('cat:pug', {
      options: {
        projectName: 'page',
        type: 'Static pages',
        skipInstall: this.options.skipInstall
      }
    }, {
      local: require.resolve('../pug')
    });
  },

  install: function() {
    this.npmInstall([
      'mkdirp',
      'lodash',
      'pre-commit'
    ], {saveDev: true});
  }
});
