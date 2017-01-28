'use strict';

const Generator = require('yeoman-generator');
const _ = require('lodash');
const extend = _.merge;

module.exports = class extends Generator {
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
    this.props = {
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
      when: this.props.items.length === 0,
      choices: ['component']
    }]).then(function(props) {
      this.props = extend(this.props, props);
    }.bind(this));
  }

  writing() {
    if(this.props.items.indexOf('component') !== -1)
      this.composeWith(require.resolve('./component'));
  }
};
