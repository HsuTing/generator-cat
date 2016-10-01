'use strict';

var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
  writing: function() {
    this.fs.copy(
      this.templatePath('editorconfig'),
      this.destinationPath('.editorconfig')
    );
  }
});
