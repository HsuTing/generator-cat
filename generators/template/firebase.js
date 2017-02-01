'use strict';

const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  prompting() {
    return this.prompt([{
      name: 'apiKey',
      message: 'apiKey of firebase',
      store: true
    }, {
      name: 'authDomain',
      message: 'authDomain of firebase',
      store: true
    }, {
      name: 'databaseURL',
      message: 'databaseURL of firebase',
      store: true
    }, {
      name: 'storageBucket',
      message: 'storageBucket of firebase',
      store: true
    }, {
      name: 'messagingSenderId',
      message: 'messagingSenderId of firebase',
      store: true
    }]).then(function(props) {
      this.config.set('firebase', props);
    }.bind(this));
  }
};
