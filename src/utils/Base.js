// @flow
'use strict';

import Generator from 'yeoman-generator';

import meow from './meow';

/**
 * Base Generator for generator-cat.
 *
 * @param {String | Array} args - For Generator
 * @param {Object} options - For Generator
*/
export default class Base extends Generator {
  state = {
    dependencies: [],
    devDependencies: []
  }

  configure = {
    heroku: false
  }

  /**
   * String template of generator-cat
   *
   * @param {Array} messageArray - Array of String template
   * @return {string} - Output string
  */
  meow = (
    messageArray: Array<string>,
    ...otherMessage: Array<string>
  ): string => this.log(meow(messageArray, ...otherMessage))

  /**
   * Install packages
  */
  installPackages = () => {
    const {dependencies, devDependencies} = this.state;
    const {heroku} = this.configure;

    if(dependencies.length !== 0)
      this.yarnInstall(dependencies);

    if(devDependencies.length !== 0) {
      this.yarnInstall(devDependencies, {
        dev: !heroku
      });
    }
  }
}
