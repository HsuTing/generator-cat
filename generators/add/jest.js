'use strict';

const _ = require('lodash');

const NeedName = require('./needName');

module.exports = class extends NeedName {
  constructor(args, opts) {
    super(args, opts);

    this.option('type', {
      type: String,
      required: false,
      default: 'normal',
      desc: 'Type of test'
    });
  }

  prompting() {
    return this.ask;
  }

  writing() {
    const name = _.lowerFirst(this.getName);
    const dataName = _.upperFirst(name);

    switch(this.options.type) {
      case 'react':
        this.writeFiles({
          'jest/react.js': [`src/__tests__/components/${dataName}.js`, {
            name: dataName
          }]
        });
        break;

      case 'relay':
        this.writeFiles({
          'jest/relay.js': [`src/__tests__/components/${dataName}.js`, {
            name: dataName,
            queryName: name
          }]
        });
        break;

      case 'graphql':
        this.writeFiles({
          'jest/graphql.js': [`src/__tests__/graphql/${name}.js`, {
            name,
            dataName
          }]
        });
        break;

      case 'server':
        this.writeFiles({
          'jest/pages.js': 'src/__tests__/pages.js'
        });
        break;
    }
  }
};
