// @flow
'ues strict';

import Base from 'utils/Base';

/**
 * The Eslint of generator-cat.
 * Use to add eslint to the project.
 *
 * @param {String | Array} args
 * @param {Object} options
*/
module.exports = class Eslint extends Base {
  /**
   * add dependencies and devDependencies
  */
  initializing() {
    this.devDependencies.push(
      'eslint',
      'eslint-watch',
      'eslint-config-cat'
    );
  }

  /**
   * Write files
  */
  writing() {
    this.addScriptsToPkg({
      lint: 'esw ./ --cache --ext .js',
      'lint:watch': 'yarn lint -w'
    });

    this.copyFiles({
      '.eslintrc.js': '.eslintrc.js',
      '.eslintignore': '.eslintignore'
    });
  }

  /**
   * Install packages
  */
  install() {
    this.installPackages();
  }
};
