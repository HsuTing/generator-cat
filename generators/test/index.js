'use strict';

const Base = require('./../base');

module.exports = class extends Base {
  initializing() {
    this.addDevDependencies([
      'istanbul',
      'should',
      'mocha'
    ]);
  }

  writing() {
    this.writePkgScripts({
      test: 'yarn babel && istanbul cover _mocha -- -R spec test/**/*.js'
    });

    this.writeFiles({
      'travis.yml': '.travis.yml'
    });
  }

  install() {
    this.addInstall(true);
  }
};
