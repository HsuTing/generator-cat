'use strict';

const Base = require('./../base');

/* istanbul ignore next */
module.exports = class extends Base {
  writing() {
    this.writePkgScripts({
      prepublish: 'yarn babel'
    });

    this.writeFiles({
      npmignore: ['.npmignore', {
        test: this.checkPlugins('test')
      }]
    });
  }
}
