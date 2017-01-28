'use strict';

const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  prompting() {
    return this.prompt([{
      name: 'app_id',
      message: 'app id of facebook',
      store: true
    }, {
      name: 'version',
      message: 'version of facebook sdk',
      store: true
    }]).then(function(props) {
      this.config.set('facebook', props);
    }.bind(this));
  }
};
