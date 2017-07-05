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

  default() {
    if(this.checkPlugins('graphql') && !this.config.get('cat'))
      this.composeWith(require.resolve('./../add'), {
        item: 'test',
        name: 'data',
        type: 'graphql'
      });
  }

  install() {
    this.addInstall(true);
  }
};
