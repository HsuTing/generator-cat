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
      name: 'client_id',
      message: 'client_id of google api'
    }]).then(function(props) {
      this.props = extend(this.props, props);
    }.bind(this));
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('google-drive/component.js'),
      this.destinationPath('src/components/share/GoogleDrive.js'), {
        client_id: this.props.client_id
      }
    );
  }
};
