'use strict';

const generator = require('yeoman-generator');
const _ = require('lodash');
const extend = _.merge;

module.exports = generator.extend({
  initializing: function() {
    this.props = {
      plugins: this.config.get('plugins') || []
    };
  },

  writing: {
    pkg: function() {
      const currentPkg = this.fs.readJSON(this.destinationPath('package.json'), {});
      const pkg = extend({
        scripts: {
          lint: 'eslint --cache ./src ./bin --ext .js',
          'lint:watch': 'esw --cache ./src ./bin --ext .js -w --color'
        }
      }, currentPkg);
      this.fs.writeJSON(this.destinationPath('package.json'), pkg);
    },

    files: function() {
      this.fs.copyTpl(
        this.templatePath('eslintrc.js'),
        this.destinationPath('.eslintrc.js'), {
          react: this.props.plugins.indexOf('react') !== -1
        }
      );
    }
  },

  install: function() {
    if(this.options.skipInstall)
      return;

    const modules = [
      'add',
      'eslint',
      'eslint-watch',
      'eslint-config-google',
      'eslint-plugin-import',
      'eslint-import-resolver-babel-module',
      'babel-eslint'
    ];

    if(this.props.plugins.indexOf('react') !== -1)
      modules.push('eslint-plugin-react');

    modules.push('--dev');
    this.spawnCommandSync('yarn', modules);
  }
});
