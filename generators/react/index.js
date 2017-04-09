'use strict';

const Generator = require('yeoman-generator');
const _ = require('lodash');
const extend = _.merge;

module.exports = class extends Generator {
  initializing() {
    this.props = {
      plugins: this.config.get('plugins') || [],
      alias: {
        public: 'public',
        components: 'components',
        componentsShare: 'components/share'
      }
    };
  }

  default() {
    this.config.set('alias', extend(
      this.props.alias,
      this.config.get('alias') || {}
    ));
    this.config.set('plugins', this.props.plugins);
    this.composeWith(require.resolve('../webpack'));
  }

  writing() {
    this.fs.copy(
      this.templatePath('Normalize.js'),
      this.destinationPath('src/components/share/Normalize.js')
    );
  }

  install() {
    const modules = [
      'cat-components',
      'react',
      'react-dom',
      'prop-types',
      'radium',
      'radium-normalize'
    ];

    if(this.props.plugins.indexOf('relay') !== -1)
      modules.push(
        'react-relay'
      );

    this.yarnInstall(modules);
  }
};
