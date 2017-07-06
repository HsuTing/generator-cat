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
      'db/field.js': [`bin/fields/${name}.js`, {
        name
      }]
    });
  }
};
