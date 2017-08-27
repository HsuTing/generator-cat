'use strict';

const Base = require('./../base');

/* istanbul ignore next */
module.exports = class extends Base {
  initializing() {
    this.addDevDependencies([
      'nyc',
      'should',
      'mocha'
    ]);
  }

  writing() {
    this.writePkgScripts({
      test: 'nyc mocha ./src/test/*.js --recursive --reporter spec'
    });

    this.writeFiles({
      nycrc: '.nycrc',
      'travis.yml': ['.travis.yml', {
        relay: this.checkPlugins('relay')
      }]
    });
  }

  default() {
    if(!this.config.get('cat')) {
      if(this.checkPlugins('server'))
        this.composeWith(require.resolve('./../add'), {
          item: 'test',
          name: 'pages',
          type: 'server'
        });

      if(this.checkPlugins('graphql'))
        this.composeWith(require.resolve('./../add'), {
          item: 'test',
          name: 'data',
          type: 'graphql'
        });
    }
  }

  install() {
    this.addInstall(true);
  }
};
