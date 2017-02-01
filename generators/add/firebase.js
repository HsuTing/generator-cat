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
      name: 'apiKey',
      message: 'apiKey of firebase'
    }, {
      name: 'authDomain',
      message: 'authDomain of firebase'
    }, {
      name: 'databaseURL',
      message: 'databaseURL of firebase'
    }, {
      name: 'storageBucket',
      message: 'storageBucket of firebase'
    }]).then(function(props) {
      this.props = extend(this.props, props);
    }.bind(this));
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('firebase.js'),
      this.destinationPath('src/utils/firebase.js'),
      this.props
    );
  }

  install() {
    this.yarnInstall([
      'firebase'
    ], {dev: true});
  }
};
