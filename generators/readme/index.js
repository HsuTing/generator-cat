'use strict';

var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
  constructor: function() {
    generators.Base.apply(this, arguments);

    this.option('name', {
      type: String,
      required: true,
      desc: 'Project name'
    });

    this.option('description', {
      type: String,
      required: true,
      desc: 'Project description'
    });

    this.option('authorName', {
      type: String,
      required: true,
      desc: 'Author name'
    });

    this.option('authorUrl', {
      type: String,
      required: true,
      desc: 'Author url'
    });
  },

  writing: function() {
    var pkg = this.fs.readJSON(this.destinationPath('package.json'), {});
    this.fs.copyTpl(
      this.templatePath('README.md'),
      this.destinationPath('README.md'), {
        projectName: this.options.name,
        description: this.options.description,
        author: {
          name: this.options.authorName,
          url: this.options.authorUrl
        },
        license: pkg.license
      }
    );
  }
});
