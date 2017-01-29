'use strict';

const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  initializing() {
    this.props = {
      plugins: this.config.get('plugins') || []
    }
  }

  default() {
    if(this.props.plugins.indexOf('websiteNoServer') !== -1)
      this.composeWith(require.resolve('./static'));
    if(this.props.plugins.indexOf('graphql') !== -1)
      this.composeWith(require.resolve('./graphql'));
  }
};
