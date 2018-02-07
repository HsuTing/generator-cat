// @flow
'use strict';

import Base from 'utils/Base';

/**
 * The Babel of generator-cat.
 * Use to add babel to the project.
 *
 * @param {String | Array} args
 * @param {Object} options
*/
module.exports = class Babel extends Base {
  /**
   * add dependencies and devDependencies
  */
  initializing() {
    /* TODO
     * note: @babel is beta
    */
    this.devDependencies.push(
      '@babel/core',
      '@babel/cli',
      '@babel/preset-env',
      '@babel/preset-stage-0',
      '@babel/preset-flow',
      'babel-plugin-module-resolver'
    );
  }

  /**
   * Write files
  */
  writing() {
    this.addScriptsToPkg({
      'babel:render': 'babel src --out-dir lib',
      babel: 'rm -rf ./lib && yarn babel:render',
      'babel:watch': 'rm -rf ./lib && yarn babel:render -w'
    });

    this.copyFiles({
      '.babelrc.js': '.babelrc.js'
    });
  }

  /**
   * Install packages
  */
  install() {
    this.installPackages();
  }
};
