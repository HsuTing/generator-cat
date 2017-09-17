'use strict';

const Base = require('./../base');

module.exports = class extends Base {
  writing() {
    this.writeFiles({
      'README.md': ['README.md', {
        name: this.getPkg.name,
        description: this.getPkg.description,
        license: this.getPkg.license,
        author: this.getAuthor,
        npm: this.checkPlugins('npm'),
        server: this.checkPlugins('server')
      }]
    });
  }
};
