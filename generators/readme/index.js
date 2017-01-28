'use strict';

const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  writing() {
    const pkg = this.fs.readJSON(this.destinationPath('package.json'), {});

    this.fs.copyTpl(
      this.templatePath('README.md'),
      this.destinationPath('README.md'), {
        name: pkg.name,
        description: pkg.description,
        license: pkg.license,
        authorName: pkg.author.name,
        authorUrl: pkg.author.url
      }
    );
  }
};
