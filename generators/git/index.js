'use strict';

var generators = require('yeoman-generator');
var _ = require('lodash');
var extend = _.merge;

module.exports = generators.Base.extend({
  constructor: function() {
    generators.Base.apply(this, arguments);

    this.option('isNeeded', {
      type: Boolean,
      required: false,
      defaults: false,
      desc: '".npmignore" is needed'
    });

    this.option('publichToNpm', {
      type: Boolean,
      required: false,
      defaults: false,
      desc: 'This package will pulish to npm'
    });
  },

  initializing: function() {
    this.props = {
      extra: this.config.get('gitignore') || [],
      npm: {
        isNeeded: this.options.isNeeded,
        publichToNpm: this.options.publichToNpm
      }
    };
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
    }
  },

  writing: function() {
    this.fs.copyTpl(
      this.templatePath('gitignore'),
      this.destinationPath('.gitignore'), {
        extra: this.props.extra,
        npm: this.props.npm
      }
    );

    if(this.props.npm.isNeeded) {
      this.fs.copy(
        this.templatePath('npmignore'),
        this.destinationPath('.npmignore')
      );

      this.fs.copy(
        this.templatePath('index.js'),
        this.destinationPath('src/index.js')
      );
    }
  }
});
