'use strict';

const Generator = require('yeoman-generator');
const _ = require('lodash');
const extend = _.merge;

module.exports = class extends Generator {
  initializing() {
    this.props = {};
  }

  prompting() {
    return this.prompt([{
      name: 'componentName',
      message: 'Name of component',
      default: 'index',
      filter: function(words) {
        return words[0].toUpperCase() + words.slice(1).toLowerCase();
      }
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
