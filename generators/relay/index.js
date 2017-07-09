'use strict';

const Base = require('./../base');

module.exports = class extends Base {
  initializing() {
    this.addDevDependencies([
      'cat-components',
      'cat-graphql',
      'fetch-everywhere',
      'babel-plugin-relay',
      'babel-polyfill',
      'relay-compiler'
    ]);

    this.addAlias({
      containers: 'containers'
    });
  }

  default() {
    if(!this.config.get('cat'))
      this.composeWith(require.resolve('./../add'), {
        item: 'relay',
        name: 'index',
        queryName: 'data'
      });
  }

  writing() {
    this.writePkgScripts({
      graphql: 'babel src/schemas --out-dir lib/schemas && build-graphql --schema ./lib/schemas/schema.js',
      relay: 'relay-compiler --src ./src --schema ./schema.graphql',
      'relay:watch': 'relay-compiler --src ./src --schema ./schema.graphql --watch'
    });

    this.writeFiles({
      'environment.js': 'src/utils/environment.js'
    });
  }

  install() {
    this.addInstall();
  }
}