'use strict';

const Base = require('./../base');

module.exports = class extends Base {
  initializing() {
    this.addDevDependencies({
      'cat-time-tracker'
    });
  }

  writing() {
    this.writePkgScripts({
      'time-tracker': 'time-tracker'
    });
  }

  install() {
    this.addInstall(true);
  }
}
