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
      extra: this.options.extra === '' ? [] : this.options.extra.split(/\s*,\s*/g)
    };

    if(this.config.get('gitignore'))
      this.props.extra = this.config.get('gitignore');
  },

  prompting: function() {
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

  writing: function() {
    this.fs.copyTpl(
      this.templatePath('gitignore'),
      this.destinationPath('.gitignore'), {
        extra: this.props.extra
      }
    );
  }
});
