'use strict';

const Base = require('./../base');

module.exports = class extends Base {
  initializing() {
    this.addDependencies([
      'cat-utils',
      'shelljs'
    ]);
  }

  writing() {
    this.writePkgScripts({
      'postgresql-copy': 'postgresql-copy',
      docker: 'export DOCKER_ENV=production && node ./bin/docker.js',
      'test-docker': 'node ./bin/docker.js'
    });

    this.writeFiles({
      'docker.js': 'bin/docker.js',
      Dockerfile: 'Dockerfile'
    });
  }
}
