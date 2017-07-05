'use strict';

const Base = require('./../base');

module.exports = class extends Base {
  initializing() {
    this.addDevDependencies([
      'cat-graphql',
      'babel-plugin-relay',
      'babel-polyfill',
      'relay-compiler'
    ]);
  }

  default() {
    if(!this.config.get('cat'))
      this.composeWith(require.resolve('./../add'), {
        item: 'relay',
        name: 'index'
      });
  }

  writing() {
    this.writePkgScripts({
      graphql: 'babel src/schemas --out-dir lib/schemas && build-graphql --schema ./lib/schemas/schema.js',
      relay: 'relay-compiler --src ./src --schema ./schema.graphql',
      'relay:watch': 'relay-compiler --src ./src --schema ./schema.graphql --watch'
    });
  }

  install() {
    this.addInstall();
  }
}
