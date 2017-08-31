'use strict';

const Base = require('./../base');

/* istanbul ignore next */
module.exports = class extends Base {
  initializing() {
    this.addDevDependencies([
      'jest'
    ]);
  }

  writing() {
    this.writePkgScripts({
      test: 'jest --silent',
      'test:watch': 'yarn test -- --watchAll',
    });

    this.writeFiles({
      'jest.config.js': 'jest.config.js',
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
