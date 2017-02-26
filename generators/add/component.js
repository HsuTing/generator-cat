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
      desc: 'Name of component'
    });
  }

  initializing() {
    this.props = {};
  }

  prompting() {
    if(this.options.name !== '') {
      this.props.componentName = this.options.name;
      return;
    }

    return this.prompt([{
      name: 'componentName',
      message: 'Name of component',
      default: 'index',
      filter: _.capitalize
    }]).then(function(props) {
      this.props = extend(this.props, props);
    }.bind(this));
  }

  writing() {
    const componentName = this.props.componentName;

    this.fs.copyTpl(
      this.templatePath('component/public.js'),
      this.destinationPath(`src/public/${componentName.toLowerCase()}.js`), {
        componentName: componentName
      }
    );

    this.fs.copyTpl(
      this.templatePath('component/component.js'),
      this.destinationPath(`src/components/${componentName}.js`), {
        componentName: componentName
      }
    );
  }
};
