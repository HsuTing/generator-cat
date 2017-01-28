'use strict';

const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  prompting() {
    return this.prompt([{
      name: 'id',
      message: 'id of google analytics',
      store: true
    }, {
      name: 'verification_token',
      message: 'verification_token of google site verification',
      store: true
    }, {
      name: 'publisher',
      message: 'publisher of google plus',
      store: true
    }]).then(function(props) {
      this.config.set('google', props);
    }.bind(this));
  }
};
