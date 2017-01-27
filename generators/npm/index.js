'use strict';

const generator = require('yeoman-generator');
const _ = require('lodash');
const extend = _.merge;

module.exports = generator.extend({
  writing: {
    pkg: function() {
      const currentPkg = this.fs.readJSON(this.destinationPath('package.json'), {});
      const pkg = extend({
        main: './lib/index.js'
      }, currentPkg);
      this.fs.writeJSON(this.destinationPath('package.json'), pkg);
    },

    files: function() {
      this.fs.copy(
        this.templatePath('npmignore'),
        this.destinationPath('.npmignore')
      );

      this.fs.copy(
        this.templatePath('index.js'),
        this.destinationPath('src/index.js')
      );
    }
  }
});
