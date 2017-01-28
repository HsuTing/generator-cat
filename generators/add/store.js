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
      name: 'storeName',
      message: 'Name of store',
      default: 'index'
    }]).then(function(props) {
      this.props = extend(this.props, props);
    }.bind(this));
  }

  writing() {
    const storeName = this.props.storeName;

    this.fs.copy(
      this.templatePath('store.js'),
      this.destinationPath(`src/stores/${storeName}.js`)
    );

    this.fs.copyTpl(
      this.templatePath('container.js'),
      this.destinationPath(`src/containers/${storeName}.js`), {
        name: storeName
      }
    );
  }
};
