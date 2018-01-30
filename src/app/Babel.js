// @flow
'use strict';

import fs from 'fs';
import path from 'path';

import Base from 'utils/Base';

/**
 * The root of generator-cat.
 * Use to set default setting.
 *
 * @param {String | Array} args
 * @param {Object} options
*/
module.exports = class Babel extends Base {
  /**
   * add dependencies and devDependencies
  */
  initializing() {
    this.dependencies.push(
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

    /* istanbul ignore else */
    if(!fs.existsSync(this.sourceRoot('./src')))
      fs.mkdirSync(path.resolve(this.sourceRoot('./src')));
  }

  /**
   * Install packages
  */
  install() {
    this.installPackages();
  }
};
