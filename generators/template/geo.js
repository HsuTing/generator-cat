'use strict';

const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  prompting() {
    return this.prompt([{
      name: 'lat',
      message: 'Latitude of geo tag',
      store: true
    }, {
      name: 'lon',
      message: 'Longitude of geo tag',
      store: true
    }, {
      name: 'placename',
      message: 'Placename of geo tag',
      store: true
    }]).then(function(props) {
      this.config.set('geo', props);
    }.bind(this));
  }
};
