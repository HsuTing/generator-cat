'use strict';

const _ = require('lodash');

const NeedName = require('./needName');

module.exports = class extends NeedName {
  prompting() {
    return this.ask;
  }

  writing() {
    const filename = _.lowerFirst(this.getName);
    const name = _.upperFirst(filename);

    this.writeFiles({
      'schema/index.js': [`src/schemas/${filename}/index.js`, {
        name,
        queryName: _.lowerFirst(name)
      }],
      'schema/dataType.js': [`src/schemas/${filename}/dataType.js`, {
        name
      }],
      'schema/query.js': [`src/schemas/${filename}/get${name}.js`, {
        name
      }],
      'schema/mutation.js': [`src/schemas/${filename}/modify${name}.js`, {
        name
      }]
    });
  }
};
