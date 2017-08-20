'use strict';

const Base = require('./../base');

module.exports = class extends Base {
  initializing() {
    this.addDevDependencies([
      'istanbul',
      'should',
      'mocha'
    ]);
  }

  writing() {
    this.writePkgScripts({
      test: 'yarn babel && istanbul cover _mocha -- -R spec test/**/*.js'
    });

    this.writeFiles({
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
      else
        this.composeWith(require.resolve('./../add'), {
          item: 'test',
          name: 'test'
        });
    }
  }

  install() {
    this.addInstall(true);
  }
};
