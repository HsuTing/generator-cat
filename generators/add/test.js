'use strict';

const _ = require('lodash');

const NeedName = require('./needName');

/* istanbul ignore next */
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
      case 'graphql':
        this.writeFiles({
          'test/graphql.js': [`src/test/${name}.js`, {
            name,
            dataName
          }]
        });
        break;

      case 'server':
        this.writeFiles({
          'test/pages.js': 'src/test/pages.js'
        });
        break;

      default:
        this.writeFiles({
          'test/test.js': [`src/test/${name}.js`, {
            name
          }]
        });
        break;
    }
  }
};
