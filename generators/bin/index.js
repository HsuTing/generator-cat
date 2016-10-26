'use strict';

var generators = require('yeoman-generator');
var _ = require('lodash');
var extend = _.merge;
var addModules = require('./../addModules');

module.exports = generators.Base.extend({
  constructor: function() {
    generators.Base.apply(this, arguments);

    this.option('modules', {
      type: String,
      required: false,
      defaults: '',
      desc: 'Modules (comma to split)'
    });
  },

  initializing: function() {
    this.props = {
      modules: this.options.modules === '' ? [] : this.options.modules.split(/\s*,\s*/g)
    };

    if(this.config.get('bin'))
      this.props.modules = this.config.get('bin');
  },

  prompting: function() {
    return this.prompt([{
      type: 'checkbox',
      name: 'modules',
      message: 'Choose modules of bin',
      choices: ['static'],
      when: this.props.modules.length === 0
    }]).then(function(props) {
      this.props = extend(this.props, props);

      this.config.set('bin', this.props.modules);
    }.bind(this));
  },

  writing: function() {
    var currentPkg = this.fs.readJSON(this.destinationPath('package.json'), {});
    var scripts = {};

    if(this.props.modules.indexOf('static') !== -1) {
      scripts.static = 'node ./bin/static.js';

      this.fs.copy(
        this.templatePath('static.js'),
        this.destinationPath('bin/static.js')
      );
    }

    var pkg = extend({
      scripts: scripts
    }, currentPkg);

    this.fs.writeJSON(this.destinationPath('package.json'), pkg);
  },

  default: function() {
    var modules = [];

    if(this.props.modules.indexOf('static') !== -1) {
      modules.push(
        'cli-color',
        'lodash',
        'mkdirp',
        'pug'
      );
    }

    this.config.set(
      'modules:dev',
      addModules(
        this.config.get('modules:dev'),
        modules
      )
    );
  }
});
