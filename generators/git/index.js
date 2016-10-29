'use strict';

var generators = require('yeoman-generator');
var _ = require('lodash');
var extend = _.merge;

module.exports = generators.Base.extend({
  constructor: function() {
    generators.Base.apply(this, arguments);

    this.option('extra', {
      type: String,
      required: false,
      defaults: '',
      desc: 'Extra (comma to split)'
    });
  },

  initializing: function() {
    this.props = {
      extra: this.options.extra === '' ? [] : this.options.extra.split(/\s*,\s*/g),
      npmignore: '',
      publishToNpm: ''
    };

    if(this.config.get('gitignore'))
      this.props.extra = this.config.get('gitignore');

    if(this.config.get('npmignore') !== undefined)
      this.props.npmignore = this.config.get('npmignore');

    if(this.config.get('publishToNpm') !== undefined)
      this.props.publishToNpm = this.config.get('publishToNpm');
  },

  prompting: {
    git: function() {
      return this.prompt([{
        name: 'extra',
        message: 'Add additional gitignore (comma to split)',
        when: this.props.extra.length === 0,
        filter: function(words) {
          if(words === '')
            return [];

          return words.split(/\s*,\s*/g);
        }
      }]).then(function(props) {
        this.props = extend(this.props, props);

        this.config.set('gitignore', this.props.extra);
      }.bind(this));
    },

    npm: function() {
      return this.prompt([{
        type: 'confirm',
        name: 'npmignore',
        message: 'Add npmignore',
        when: this.props.npmignore === ''
      }]).then(function(props) {
        this.props = extend(this.props, props);

        this.config.set('npmignore', this.props.npmignore);
      }.bind(this));
    },

    publishToNpm: function() {
      return this.prompt([{
        type: 'confirm',
        name: 'publishToNpm',
        message: 'Will publish to npm',
        when: this.props.npmignore && this.props.publishToNpm === ''
      }]).then(function(props) {
        this.props = extend(this.props, props);

        this.config.set('publishToNpm', this.props.publishToNpm);
      }.bind(this));
    }
  },

  writing: function() {
    this.fs.copyTpl(
      this.templatePath('gitignore'),
      this.destinationPath('.gitignore'), {
        extra: this.props.extra,
        npmignore: this.props.npmignore,
        publishToNpm: this.props.publishToNpm
      }
    );

    if(this.props.npmignore)
      this.fs.copy(
        this.templatePath('npmignore'),
        this.destinationPath('.npmignore')
      );
  }
});
