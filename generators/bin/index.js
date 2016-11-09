'use strict';

var generators = require('yeoman-generator');
var _ = require('lodash');
var extend = _.merge;

module.exports = generators.Base.extend({
  constructor: function() {
    generators.Base.apply(this, arguments);

    this.option('needStatic', {
      type: Boolean,
      required: false,
      default: false,
      desc: 'Need static'
    });
  },

  initializing: function() {
    this.props = {
      needStatic: this.options.needStatic
    };
  },

  prompting: function() {
    return this.prompt([{
      type: 'checkbox',
      name: 'modules',
      message: 'Choose modules of bin',
      choices: ['ftp', 'aws'],
      store: true
    }]).then(function(props) {
      this.props = extend(this.props, props);
    }.bind(this));
  },

  writing: function() {
    var scripts = {};

    if(this.props.needStatic)
      this.props.modules.push('static');

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

  install: function() {
    if(this.options.skipInstall)
      return;

    var modules = ['add'];

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

    if(modules.length === 1)
      return;

    modules.push('--dev');
    this.spawnCommandSync('yarn', modules);
  }
});
