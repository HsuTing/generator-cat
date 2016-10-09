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
        test: 'istanbul cover _mocha -- -R spec'
      }
    }, currentPkg);

    this.fs.writeJSON(this.destinationPath('package.json'), pkg);

    // copy files
    this.fs.copy(
      this.templatePath('index.js'),
      this.destinationPath('test/index.js')
    );
  },

  install: function() {
    this.npmInstall([
      'istanbul',
      'mocha'
    ], {saveDev: true});
  }
});
