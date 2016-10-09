'use strict';

var generators = require('yeoman-generator');
var _ = require('lodash');
var extend = _.merge;

module.exports = generators.Base.extend({
  writing: function() {
    // write package.json
    var currentPkg = this.fs.readJSON(this.destinationPath('package.json'), {});

    var pkg = extend({
      scripts: {
        test: 'mocha --reporter spec && istanbul cover ./src/**/*.js'
      }
    }, currentPkg);

    this.fs.writeJSON(this.destinationPath('package.json'), pkg);
  },

  install: function() {
    this.npmInstall([
      'istanbul',
      'mocha'
    ], {saveDev: true});
  }
});
