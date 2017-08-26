'use strict';

const Base = require('./../base');

/* istanbul ignore next */
module.exports = class extends Base {
  writing() {
    this.writeFiles({
      'README.md': ['README.md', {
        name: this.getPkg.name,
        description: this.getPkg.description,
        license: this.getPkg.license,
        author: this.getAuthor,
        npm: this.checkPlugins('npm'),
        test: this.checkPlugins('test'),
        server: this.checkPlugins('server')
      }]
    });
  }
}
