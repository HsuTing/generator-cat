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

  prompting() {
    return this.prompt([{
      type: 'confirm',
      name: 'router',
      message: 'Use react-router',
      store: true
    }, {
      type: 'confirm',
      name: 'redux',
      message: 'Use react-redux',
      store: true
    }]).then(function(props) {
      if(props.router && this.props.plugins.indexOf('router') === -1) {
        this.props.alias = extend(this.props.alias, {
          containers: 'containers'
        });
        this.props.plugins.push('router');
      }

      if(props.redux && this.props.plugins.indexOf('redux') === -1) {
        this.props.alias = extend(this.props.alias, {
          containers: 'containers',
          reducers: 'reducers',
          actions: 'actions',
          stores: 'stores'
        });
        this.props.plugins.push('redux');
      }
    }.bind(this));
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
  }

  install() {
    const modules = [
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

    if(this.props.plugins.indexOf('graphql') !== -1)
      modules.push(
        'react-relay'
      );

    this.yarnInstall(modules);
  }
};
