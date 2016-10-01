'use strict';

var generators = require('yeoman-generator');
var _ = require('lodash');
var extend = _.merge;

module.exports = generators.Base.extend({
  constructor: function() {
    generators.Base.apply(this, arguments);

    this.option('react', {
      type: Boolean,
      required: false,
      default: true,
      desc: 'Use React or not(default: true)'
    });
  },

  writing: function() {
    this.fs.copyTpl(
      this.templatePath('eslintignore'),
      this.destinationPath('.eslintignore'), {
        react: this.options.react
      }
    );
    this.fs.copyTpl(
      this.templatePath('eslintrc'),
      this.destinationPath('.eslintrc'), {
        react: this.options.react
      }
    );

    var currentPkg = this.fs.readJSON(this.destinationPath('package.json'), {});
    var pkg = extend({
      scripts: {
        eslint: 'eslint --cache ./ --ext .js'
      },
      'pre-commit': []
    }, currentPkg);

    if(pkg['pre-commit'].indexOf('eslint') === -1) {
      pkg['pre-commit'].push('eslint');
    }

    this.fs.writeJSON(this.destinationPath('package.json'), pkg);
  },

  install: function() {
    if(this.options.react)
      this.npmInstall([
        'eslint',
        'eslint-config-google',
        'babel-eslint',
        'eslint-plugin-react',
        'pre-commit'
      ], {saveDev: true});
    else
      this.npmInstall([
        'eslint',
        'eslint-config-google',
        'babel-eslint',
        'pre-commit'
      ], {saveDev: true});
  }
});
