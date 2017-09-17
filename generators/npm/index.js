'use strict';

const Base = require('./../base');

module.exports = class extends Base {
  writing() {
    this.writePkgScripts({
      prepublish: 'yarn babel'
    });

    this.writeFiles({
      npmignore: '.npmignore'
    });
  }
};
