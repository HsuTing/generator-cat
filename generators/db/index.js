'use strict';

const Base = require('./../base');

module.exports = class extends Base {
  initializing() {
    this.addDependencies([
      'cat-graphql',
      'sequelize',
      'callsite',
      'sqlite3'
    ]);

    this.addAlias({
      constants: 'constants',
      utils: 'utils'
    });
  }

  writing() {
    this.writePkgScripts({
      'build:db': 'node ./lib/bin/build-db.js'
    });

    this.writeFiles({
      'build-db.js': 'src/bin/build-db.js',
      'getTables.js': 'src/utils/getTables.js',
      'models.js': 'src/constants/models.js'
    });
  }

  install() {
    this.addInstall();
  }
};
