'use strict';

var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
  writing: function() {
    this.fs.copy(
      this.templatePath('gitignore'),
      this.destinationPath('.gitignore')
    );
  },

  end: function() {
    this.spawnCommandSync('git', ['init']);
  }
});
