'use strict';

const generator = require('yeoman-generator');
const _ = require('lodash');
const extend = _.merge;

module.exports = generator.extend({
  constructor: function() {
    generator.apply(this, arguments);
  },

  initializing: function() {
    this.props = {
      plugins: this.config.get('plugins') || [],
      extra: this.config.get('gitignore') || []
    };
  },

  prompting: function() {
    return this.prompt([{
      name: 'extra',
      message: 'Add additional gitignore (comma to split)',
      when: this.props.extra.length === 0,
      filter: function(words) {
        return words === '' ? [] : words.split(/\s*,\s*/g);
      }
    }]).then(function(props) {
      this.props = extend(this.props, props);
    }.bind(this));
  },

  writing: function() {
    // add special extra
    if(this.props.plugins.indexOf('server') !== -1 &&
      this.props.extra.indexOf('public/js') === -1)
      this.props.extra.push('public/js');

    if(this.props.plugins.indexOf('npm server') !== -1 &&
      this.props.extra.indexOf('lib') === -1)
      this.props.extra.push('lib');

    // copy file
    this.fs.copyTpl(
      this.templatePath('gitignore'),
      this.destinationPath('.gitignore'), {
        extra: this.props.extra
      }
    );

    this.config.set('gitignore', this.props.extra);
  }
});
