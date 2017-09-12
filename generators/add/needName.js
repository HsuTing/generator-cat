'use strict';

const Base = require('./../base');

module.exports = class extends Base {
  constructor(args, opts) {
    super(args, opts);

    this.option('name', {
      type: String,
      required: false,
      desc: 'Name of component'
    });

    this.state = {
      name: 'index'
    };
  }

  get ask() {
    if(this.options.name)
      return;

    return this.prompt([{
      name: 'name',
      message: 'Name of add file',
      default: 'index'
    }]).then(function(state) {
      this.state.name = state.name;
    }.bind(this));
  }

  get getName() {
    return this.options.name || this.state.name;
  }
};
