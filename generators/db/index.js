'use strict';

const Base = require('./../base');

module.exports = class extends Base {
  initializing() {
    this.addDependencies([
      'babel-polyfill',
      'cat-utils',
      'sqlite3'
    ]);

    this.addAlias({constants: 'constants'});
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
      db: 'node ./lib/bin/db.js',
      'db-shell': 'db-shell'
    });

    this.writeFiles({
      'tables.js': 'src/constants/tables/index.js',
      'db.js': 'src/bin/db.js'
    });
  }

  install() {
    this.addInstall();
  }
}
