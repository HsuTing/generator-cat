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
  },

  default: function() {
    this.composeWith('cat:react', {
      options: {
        name: this.props.name,
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
      'pre-commit'
    ], {saveDev: true});
  }
});
