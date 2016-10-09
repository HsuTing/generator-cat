'use strict';

var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
  constructor: function() {
    generators.Base.apply(this, arguments);

    this.option('projectName', {
      type: String,
      required: true,
      desc: 'Project name'
    });

    this.option('type', {
      type: String,
      required: false,
      desc: 'Type'
    });
  },

  writing: function() {
    this.pkg = this.fs.readJSON(this.destinationPath('package.json'), {});
    this.fs.copyTpl(
      this.templatePath('page.pug'),
      this.destinationPath('views/' + this.options.projectName + '.pug'), {
        name: this.pkg.name,
        type: this.options.type
      }
    );
  },

  install: function() {
    this.npmInstall([
      'pug'
    ], {saveDev: true});
  }
});
