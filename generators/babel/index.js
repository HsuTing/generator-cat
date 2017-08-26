'use strict';

const Base = require('./../base');

/* istanbul ignore next */
module.exports = class extends Base {
  initializing() {
    this.addDevDependencies([
      'babel-cli',
      'babel-core',
      'babel-plugin-transform-object-assign',
      'babel-plugin-module-resolver',
      'babel-preset-env',
      'babel-preset-stage-0'
    ], plugin => {
      switch(plugin) {
        case 'react': return [
          'babel-preset-react',
          'babel-plugin-transform-decorators-legacy'
        ];

        case 'relay': return [
          'babel-plugin-relay',
          'babel-polyfill'
        ];
      }
    });

    this.addAlias({utils: 'utils'});
  }

  writing() {
    this.writePkgScripts({
      babel: 'rm -rf ./lib && babel src --out-dir lib',
      'babel:watch': 'rm -rf ./lib && babel -w src --out-dir lib'
    });

    this.writeFiles({
      babelrc: ['.babelrc', {
        relay: this.checkPlugins('relay'),
        react: this.checkPlugins('react'),
        alias: this.getAlias
      }]
    });
  }

  install() {
    this.addInstall();
  }
}
