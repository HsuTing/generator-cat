'use strict';

const generator = require('yeoman-generator');
const _ = require('lodash');
const extend = _.merge;

const convertAlias = function(alias) {
  return Object.keys(alias)
    .map(function(key) {
      return {
        key: key,
        value: alias[key]
      };
    });
};

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
          babel: 'rm -rf ./lib && babel src --out-dir lib',
          'babel:watch': 'rm -rf ./lib && babel -w src --out-dir lib'
        }
      }, currentPkg);
      this.fs.writeJSON(this.destinationPath('package.json'), pkg);
    },

    files: function() {
      this.fs.copyTpl(
        this.templatePath('babelrc'),
        this.destinationPath('.babelrc'), {
          react: this.props.plugins.indexOf('react') !== -1,
          alias: convertAlias(
            this.config.get('alias') || {}
          )
        }
      );
    }
  },

  install: function() {
    const modules = [
      'babel-cli',
      'babel-core',
      'babel-plugin-transform-object-assign',
      'babel-plugin-module-resolver',
      'babel-preset-latest',
      'babel-preset-stage-0'
    ];

    if(this.props.plugins.indexOf('react') !== -1)
      modules.push(
        'babel-preset-react',
        'babel-plugin-transform-decorators-legacy'
      );

    this.yarnInstall(modules, {dev: true});
  }
});
