'use strict';

const Base = require('./../base');

module.exports = class extends Base {
  initializing() {
    this.addDevDependencies(['jest'], plugin => {
      switch(plugin) {
        case 'react': return [
          'react-test-renderer',
          'https://github.com/HsuTing/cat-jest.git',
          'enzyme',
          'enzyme-adapter-react-16'
        ];
      }
    });
  }

  writing() {
    this.writePkgScripts({
      test: 'jest --silent',
      'test:watch': 'yarn test --watchAll'
    });

    this.writeFiles({
      'jest.config.js': ['jest.config.js', {
        react: this.checkPlugins('react'),
        mobile_app: this.checkPlugins('mobile app')
      }]
    });

    if(this.checkPlugins('private')) {
      this.writeFiles({
        'circleci.yml': ['.circleci/config.yml', {
          relay: this.checkPlugins('relay'),
          mobile_app: this.checkPlugins('mobile app')
        }]
      });
    } else {
      this.writeFiles({
        'travis.yml': ['.travis.yml', {
          relay: this.checkPlugins('relay'),
          mobile_app: this.checkPlugins('mobile app')
        }]
      });
    }
  }

  default() {
    /* istanbul ignore next */
    if(!this.config.get('cat')) {
      if((this.checkPlugins('react') || this.checkPlugins('relay')) && !this.checkPlugins('mobile app')) {
        this.composeWith(require.resolve('./../add'), {
          item: 'jest',
          name: 'Index',
          type: this.checkPlugins('relay') ? 'relay' : 'react'
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
          name: this.checkPlugins('react') ? 'index': 'data',
          type: 'graphql'
        });
      }
    }
  }

  install() {
    this.addInstall(true);
  }
};
