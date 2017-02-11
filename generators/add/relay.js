'use strict';

const Generator = require('yeoman-generator');
const _ = require('lodash');
const extend = _.merge;

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.option('name', {
      type: String,
      required: false,
      default: '',
      desc: 'Name of relay'
    });
  }

  initializing() {
    this.props = {};
  }

  prompting() {
    if(this.options.name !== '') {
      this.props.relayName = this.options.name;
      return;
    }

    return this.prompt([{
      name: 'relayName',
      message: 'Name of relay',
      default: 'index',
      filter: function(words) {
        return words[0].toUpperCase() + words.slice(1);
      }
    }]).then(function(props) {
      this.props = extend(this.props, props);
    }.bind(this));
  }

  writing() {
    const relayName = this.props.relayName;

    this.fs.copyTpl(
      this.templatePath('relay/component.js'),
      this.destinationPath(`src/components/${relayName}.js`), {
        name: relayName
      }
    );

    this.fs.copyTpl(
      this.templatePath('relay/public.js'),
      this.destinationPath(`src/public/${relayName.toLowerCase()}.js`), {
        name: relayName
      }
    );

    this.fs.copyTpl(
      this.templatePath('relay/container.js'),
      this.destinationPath(`src/containers/${relayName.toLowerCase()}.js`), {
        name: relayName
      }
    );
  }
};
