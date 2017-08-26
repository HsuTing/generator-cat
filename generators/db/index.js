'use strict';

const Base = require('./../base');

/* istanbul ignore next */
module.exports = class extends Base {
  initializing() {
    this.addDependencies([
      'babel-polyfill',
      'cat-utils',
      'sqlite3'
    ]);
  }

  default() {
    if(!this.config.get('cat'))
      this.composeWith(require.resolve('./../add'), {
        item: 'db',
        name: 'users'
      });
  }

  writing() {
    this.writePkgScripts({
      db: 'node ./bin/db.js',
      'db-shell': 'db-shell'
    });

    this.writeFiles({
      'fields.js': 'bin/fields/index.js',
      'db.js': 'bin/db.js'
    });
  }

  install() {
    this.addInstall();
  }
}
