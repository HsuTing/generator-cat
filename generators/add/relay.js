'use strict';

const _ = require('lodash');

const NeedName = require('./needName');

module.exports = class extends NeedName {
  constructor(args, opts) {
    super(args, opts);

    this.option('queryName', {
      type: String,
      required: false,
      default: 'data',
      desc: 'name of query'
    });
  }

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
        relay: true
      }],
      'relay/container.js': [`src/containers/${componentName}Container.js`, {
        componentName,
        queryName: _.lowerFirst(this.options.queryName)
      }]
    });
  }
};
