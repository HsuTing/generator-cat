'use strict';

var generators = require('yeoman-generator');
var _ = require('lodash');
var extend = _.merge;
var addModules = require('./../addModules');

module.exports = generators.Base.extend({
  initializing: function() {
    this.props = {};
  },

  prompting: function() {
    return this.prompt([{
      type: 'checkbox',
      name: 'modules',
      message: 'Choose modules of bin',
      choices: ['static'],
      store: true
    }]).then(function(props) {
      this.props = extend(this.props, props);
    }.bind(this));
  },

  writing: function() {
    var scripts = {};

    // copy files
    this.props.modules.forEach(function(module) {
      switch(module) {
        case 'static':
          scripts.static = 'node ./bin/static.js';

          this.fs.copy(
            this.templatePath('static/static.js'),
            this.destinationPath('bin/static.js')
          );

          this.fs.copyTpl(
            this.templatePath('static/config.js'),
            this.destinationPath('static.config.js'), {
              names: this.config.get('names') || []
            }
          );
          break;

        default:
          break;
      }
    }.bind(this));

    // write package.json
    var currentPkg = this.fs.readJSON(this.destinationPath('package.json'), {});
    var pkg = extend({
      scripts: scripts
    }, currentPkg);

    this.fs.writeJSON(this.destinationPath('package.json'), pkg);
  },

  default: function() {
    var modules = [];

    this.props.modules.forEach(function(module) {
      switch(module) {
        case 'static':
          modules.push(
            'cli-color',
            'lodash',
            'mkdirp',
            'pug'
          );
          break;

        default:
          break;
      }
    });

    this.config.set(
      'modules:dev',
      addModules(
        this.config.get('modules:dev'),
        modules
      )
    );
  }
});
