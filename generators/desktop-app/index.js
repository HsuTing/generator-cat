'use strict';

const Base = require('./../base');

/* istanbul ignore next */
module.exports = class extends Base {
  initializing() {
    this.addDevDependencies([
      'electron',
      'electron-packager',
      'electron-rebuild'
    ]);
  }

  writing() {
    this.writePkgScripts({
      electron: 'electron ./index.js',
      package: 'yarn prod && node ./bin/build-app.js'
    });

    this.writeFiles({
      'electron.js': 'index.js',
      'electron-build.js': ['bin/build-app.js', {
        authorName: this.getAuthor.name,
        name: this.getPkg.name
      }]
    });
  }

  install() {
    this.addInstall(true);
  }
}
