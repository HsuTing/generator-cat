'use strict';

const _ = require('lodash');

const NeedName = require('./needName');

module.exports = class extends NeedName {
  prompting() {
    return this.ask;
  }

  writing() {
    const componentName = _.upperFirst(this.getName);

    this.writeFiles({
      'react/public.js': [`src/public/${_.lowerFirst(componentName)}.js`, {
        componentName
      }],
      'react/component.js': [`src/components/${componentName}.js`, {
        componentName,
        relay: false
      }]
    });
  }
};
