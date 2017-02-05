'use strict';

const Generator = require('yeoman-generator');
const chalk = require('chalk');
const _ = require('lodash');
const extend = _.merge;

module.exports = class extends Generator {
  initializing() {
    this.props = {};
  }

  prompting() {
    return this.prompt([{
      type: 'checkbox',
      name: 'plugins',
      message: 'Choose version you need',
      choices: [
        'node',
        'react'
      ]
    }]).then(function(props) {
      this.props = extend(this.props, props);
    }.bind(this));
  }

  default() {
    if(this.props.plugins.indexOf('react') !== -1)
      this.composeWith(require.resolve('./googleDriveReact'));
  }

  writing() {
    if(this.props.plugins.indexOf('node') !== -1)
      this.fs.copy(
        this.templatePath('google-drive/node.js'),
        this.destinationPath('src/utils/googleDrive.js')
      );
  }

  install() {
    if(this.props.plugins.indexOf('node') !== -1)
      this.yarnInstall([
        'readline',
        'googleapis',
        'google-auth-library'
      ], {dev: true});
  }

  end() {
    this.log(chalk.red('You need to add "https://apis.google.com/js/api.js" to html.'));
  }
};
