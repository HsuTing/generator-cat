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
      desc: 'Name of schema'
    });
  }

  initializing() {
    this.props = {};
  }

  prompting() {
    if(this.options.name !== '') {
      this.props.schemaName = this.options.name;
      return;
    }

    return this.prompt([{
      name: 'schemaName',
      message: 'Name of schema',
      default: 'index'
    }]).then(function(props) {
      this.props = extend(this.props, props);
    }.bind(this));
  }

  writing() {
    const schemaName = this.props.schemaName;

    this.fs.copyTpl(
      this.templatePath('schema.js'),
      this.destinationPath(`src/schemas/${schemaName}.js`), {
        name: schemaName
      }
    );
  }
};
