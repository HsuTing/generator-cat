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
      choices: [
        'component',
        'reducer',
        'store',
        'router',
        'schema',
        'relay',
        'sqlite3',
        'postgresql',
        'fb-bot',
        'line-bot'
      ]
    }]).then(function(props) {
      this.props = extend(this.props, props);
    }.bind(this));
  }

  writing() {
    const special = [
      'component',
      'schema',
      'relay'
    ];

    this.props.items.forEach(function(name) {
      if(special.indexOf(name) !== -1)
        return;

      this.composeWith(require.resolve(`./${name}`));
    }.bind(this));

    // special
    if(this.props.items.indexOf('component') !== -1)
      this.composeWith(require.resolve('./component'), {
        name: this.options.item !== '' ? 'Index' : ''
      });
    if(this.props.items.indexOf('schema') !== -1)
      this.composeWith(require.resolve('./schema'), {
        name: this.options.item !== '' ? 'index' : ''
      });
    if(this.props.items.indexOf('relay') !== -1)
      this.composeWith(require.resolve('./relay'), {
        name: this.options.item !== '' ? 'Index' : ''
      });
  }
};
