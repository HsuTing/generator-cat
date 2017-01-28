'use strict';

const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  prompting() {
    return this.prompt([{
      name: 'site',
      message: 'site of twitter',
      store: true
    }, {
      name: 'creator',
      message: 'creator of twitter',
      store: true
    }]).then(function(props) {
      this.config.set('twitter', props);
    }.bind(this));
  }
};
