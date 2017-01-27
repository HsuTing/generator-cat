'use strict';

const generator = require('yeoman-generator');
const _ = require('lodash');
const extend = _.merge;

const checkIfExist = function(modules, module) {
  if(modules.indexOf(module) === -1)
    modules.push(module)

  return modules;
};

module.exports = generator.extend({
  initializing: function() {
    this.props = {
      plugins: this.config.get('plugins') || [],
      scripts: {},
      modules: [],
      devModules: []
    }

    this.addModules = function(modules, devFlag) {
      modules.forEach(function(name) {
        if(devFlag) {
          this.props.devModules = checkIfExist(this.props.devModules, name);
        } else {
          this.props.modules = checkIfExist(this.props.modules, name);
        }
      }.bind(this));
    }.bind(this);
  },

  writing: {
    websiteNoServer: function() {
      if(this.props.plugins.indexOf('websiteNoServer') === -1)
        return;

      // add script
      this.props.scripts.static = 'node ./bin/static.js';

      // copy files
      this.fs.copy(
        this.templatePath('static.js'),
        this.destinationPath('bin/static.js')
      );

      // add dev modules
      this.addModules([
        'nunjucks',
        'chalk',
        'html-minifier'
      ], true);
    },

    pkg: function() {
      const currentPkg = this.fs.readJSON(this.destinationPath('package.json'), {});
      const pkg = extend({
        scripts: this.props.scripts
      }, currentPkg);
      this.fs.writeJSON(this.destinationPath('package.json'), pkg);
    }
  },

  install: function() {
    if(this.props.modules.length !== 0)
      this.yarnInstall(this.props.modules);
    if(this.props.devModules.length !== 0)
      this.yarnInstall(this.props.devModules, {dev: true});
  }
});
