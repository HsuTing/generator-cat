'use strict';

const Base = require('./../base');

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
    /* istanbul ignore next */
    if(!this.config.get('cat')) {
      if(this.checkPlugins('server'))
        this.composeWith(require.resolve('./../add'), {
          item: 'jest',
          name: 'pages',
          type: 'server'
        });

      if(this.checkPlugins('graphql'))
        this.composeWith(require.resolve('./../add'), {
          item: 'jest',
          name: 'data',
          type: 'graphql'
        });
    }
  }

  install() {
    this.addInstall(true);
  }
};
