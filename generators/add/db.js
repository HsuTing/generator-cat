'use strict';

const _ = require('lodash');

const NeedName = require('./needName');

/* istanbul ignore next */
module.exports = class extends NeedName {
  prompting() {
    return this.ask;
  }

  writing() {
    const name = _.lowerFirst(this.getName);

    this.writeFiles({
      'db/table.js': [`src/constants/tables/${name}.js`, {
        name
      }]
    });
  }
};
