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
      name: 'routerName',
      message: 'Name of router',
      default: 'index'
    }, {
      type: 'confirm',
      name: 'redux',
      message: 'Use redux or not',
      store: true
    }]).then(function(props) {
      this.props = extend(this.props, props);
    }.bind(this));
  }

  writing() {
    const routerName = this.props.routerName;

    this.fs.copyTpl(
      this.templatePath('router.js'),
      this.destinationPath(`src/containers/${routerName}.js`), {
        redux: this.props.redux,
        name: routerName
      }
    );
  }
};
