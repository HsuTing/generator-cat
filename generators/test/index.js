'use strict';

const Base = require('./../base');

module.exports = class extends Base {
  initializing() {
    this.addDevDependencies(['jest'], plugin => {
      switch(plugin) {
        case 'react': return [
          'react-test-renderer',
          'enzyme'
        ];
      }
    });
  }

  writing() {
    this.writePkgScripts({
      test: 'jest --silent',
      'test:watch': 'yarn test -- --watchAll'
    });

    this.writeFiles({
      'jest.config.js': ['jest.config.js', {
        react: this.checkPlugins('react'),
        mobile_app: this.checkPlugins('mobile app')
      }],
      'travis.yml': ['.travis.yml', {
        relay: this.checkPlugins('relay'),
        mobile_app: this.checkPlugins('mobile app')
      }]
    });
  }

  default() {
    /* istanbul ignore next */
    if(!this.config.get('cat')) {
      if(this.checkPlugins('react') && !this.checkPlugins('mobile app')) {
        this.composeWith(require.resolve('./../add'), {
          item: 'jest',
          name: 'Index',
          type: 'react'
        });
      }

      if(this.checkPlugins('server')) {
        this.composeWith(require.resolve('./../add'), {
          item: 'jest',
          name: 'pages',
          type: 'server'
        });
      }

      if(this.checkPlugins('graphql')) {
        this.composeWith(require.resolve('./../add'), {
          item: 'jest',
          name: 'data',
          type: 'graphql'
        });
      }
    }
  }

  install() {
    this.addInstall(true);
  }
};
