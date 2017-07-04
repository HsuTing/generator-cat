'use strict';

const _ = require('lodash');
const extend = _.merge;

const Base = require('./../base');

module.exports = class extends Base {
  constructor(args, opts) {
    super(args, opts);

    this.option('name', {
      type: String,
      required: false,
      desc: 'Name of component'
    });
  }

  initializing() {
    this.state = {
      componentName: this.options.name
    };
  }

  prompting() {
    if(this.state.componentName)
      return;

    return this.prompt([{
      name: 'componentName',
      message: 'Name of component',
      default: 'Index'
    }]).then(function(state) {
      this.state = extend(this.state, state);
    }.bind(this));
  }

  writing() {
    const componentName = _.upperFirst(this.state.componentName);

    this.writeFiles({
      'react/public.js': [`src/public/${_.lowerFirst(this.state.componentName)}.js`, {
        componentName
      }],
      'react/component.js': [`src/components/${componentName}.js`, {
        componentName
      }]
    });
  }
};
