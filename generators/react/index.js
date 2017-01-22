'use strict';

const generator = require('yeoman-generator');
const _ = require('lodash');
const extend = _.merge;

module.exports = generator.extend({
  initializing: function() {
    this.props = {
      plugins: this.config.get('plugins') || [],
      alias: this.config.get('alias') || []
    };

    const newAlias = extend(this.props.alias, {
      componentsShare: './components/share'
    });
    this.config.set('alias', newAlias);
  },

  writing: function() {
    // copy files
    this.fs.copy(
      this.templatePath('Wrapper.js'),
      this.destinationPath('src/components/share/Wrapper.js')
    );

    this.fs.copy(
      this.templatePath('Normalize.js'),
      this.destinationPath('src/components/share/Normalize.js')
    );

    if(this.props.plugins.indexOf('router') !== -1)
      this.fs.copy(
        this.templatePath('Link.js'),
        this.destinationPath('src/components/share/Link.js')
      );
  },

  install: function() {
    if(this.options.skipInstall)
      return;

    const modules = [
      'add',
      'react',
      'react-dom',
      'radium',
      'radium-normalize'
    ];

    if(this.props.plugins.indexOf('router') !== -1)
      modules.push('react-router');

    if(this.props.plugins.indexOf('redux') !== -1)
      modules.push(
        'redux',
        'react-redux'
      );

    this.spawnCommandSync('yarn', modules);
  }
});
