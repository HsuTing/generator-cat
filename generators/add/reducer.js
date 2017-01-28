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
      name: 'reducerName',
      message: 'Name of reducer',
      default: 'index'
    }]).then(function(props) {
      this.props = extend(this.props, props);
    }.bind(this));
  }

  writing() {
    const reducerName = this.props.reducerName;

    this.fs.copyTpl(
      this.templatePath('reducer.js'),
      this.destinationPath(`src/reducers/${reducerName}.js`), {
        name: reducerName
      }
    );

    this.fs.copy(
      this.templatePath('action.js'),
      this.destinationPath(`src/actions/${reducerName}.js`)
    );
  }
};
