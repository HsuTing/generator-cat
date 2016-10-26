'use strict';

var generators = require('yeoman-generator');
var _ = require('lodash');
var extend = _.merge;

module.exports = generators.Base.extend({
  constructor: function() {
    generators.Base.apply(this, arguments);

    this.option('structure', {
      type: String,
      required: false,
      default: '',
      desc: 'Add README.md to folder structure(comma to split)'
    });
  },

  initializing: function() {
    this.props = {
      structure: this.options.structure === '' ? [] : this.options.structure.split(/\s*,\s*/g)
    };
  },

  prompting: function() {
    return this.prompt([{
      name: 'structure',
      message: 'Add README.md to folder structure(comma to split)',
      when: this.options.structure.length === 0,
      filter: function(words) {
        if(words === '')
          return [];

        return words.split(/\s*,\s*/g);
      }
    }]).then(function(props) {
      this.props = extend(this.props, props);
    }.bind(this));
  },

  write: function() {
    this.props.structure.forEach(function(name) {
      this.fs.copy(
        this.templatePath(name + '.md'),
        this.destinationPath('src/' + name + '/README.md')
      );
    }.bind(this));
  }
});
