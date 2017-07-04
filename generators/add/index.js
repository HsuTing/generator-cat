'use strict';

const fs = require('fs');
const _ = require('lodash');
const extend = _.merge;

const Base = require('./../base');

module.exports = class extends Base {
  constructor(args, opts) {
    super(args, opts);

    this.option('item', {
      type: String,
      required: false,
      default: '',
      desc: 'Name of item'
    });
  }

  initializing() {
    this.state = {
      items: this.options.item === '' ? [] : [
        this.options.item
      ]
    };
  }

  prompting() {
    return this.prompt([{
      type: 'checkbox',
      name: 'items',
      message: 'Choose add items',
      when: this.state.items.length === 0,
      choices: fs.readdirSync(__dirname).filter(file => !(
        file[0] === '.' || file === 'templates' || file === 'index.js'
      )).map(file => file.replace('.js', ''))
    }]).then(function(state) {
      this.state = extend(this.state, state);
    }.bind(this));
  }

  default() {
    this.state.items.forEach(function(item) {
      this.composeWith(require.resolve(`./${item}`), this.options);
    }.bind(this));
  }
};
