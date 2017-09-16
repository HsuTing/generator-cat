'use strict';

const _ = require('lodash');

const NeedName = require('./needName');

module.exports = class extends NeedName {
  prompting() {
    return this.ask;
  }

  writing() {
    const name = _.lowerFirst(this.getName);

    this.writeFiles({
      'router/router.js': [`src/routers/${name}.js`, {
        name,
        componentName: _.upperFirst(name),
        react: this.checkPlugins('react'),
        relay: this.checkPlugins('relay')
      }]
    });
  }
};
