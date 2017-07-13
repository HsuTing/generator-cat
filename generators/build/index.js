'use strict';

const Base = require('./../base');

module.exports = class extends Base {
  initializing() {
    this.addDevDependencies([
      'mem-fs',
      'mem-fs-editor',
      'chalk'
    ]);
  }

  writing() {
    this.writePkgScripts({
      'build-template': 'node ./bin/build.js'
    });

    this.writeFiles({
      'build.js': './bin/build.js'
    });
  }

  install() {
    this.addInstall();
  }
}
