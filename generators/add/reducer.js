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
      'reducer/reducer.js': [`src/reducers/${name}.js`, {
        name
      }],
      'reducer/action.js': [`src/actions/${name}.js`, {
        name: _.upperFirst(name)
      }]
    });
  }
};
