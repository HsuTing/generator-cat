'use strict';

var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
  constructor: function() {
    generators.Base.apply(this, arguments);

    this.option('test', {
      type: Boolean,
      required: false,
      default: false,
      desc: 'If it is test pug, it will render test url script.'
    });

    this.option('projectName', {
      type: String,
      required: true,
      desc: 'Project name'
    });
  },

  writing: function() {
    this.pkg = this.fs.readJSON(this.destinationPath('package.json'), {});
    this.fs.copyTpl(
      this.templatePath('page.pug'),
      this.destinationPath('views/' + this.options.projectName + '.pug'), {
        test: this.options.test,
        name: this.pkg.name
      }
    );
  },

  install: function() {
    this.npmInstall([
      'pug'
    ], {saveDev: true});
  }
});
