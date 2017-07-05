'use strict';

const Base = require('./../base');

module.exports = class extends Base {
  initializing() {
    this.addDependencies([
      'cat-components',
      'react',
      'react-dom',
      'prop-types',
      'radium',
      'radium-normalize'
    ], plugin => {
      switch(plugin) {
        case 'relay': return ['react-relay'];
      }
    });

    this.addAlias({
      public: 'public',
      components: 'components',
      componentsShare: 'components/share'
    });
  }

  default() {
    this.composeWith(require.resolve('./../webpack'));

    if(!this.config.get('cat'))
      this.composeWith(require.resolve('./../add'), {
        item: 'react',
        name: 'index'
      });
  }

  writing() {
    this.writeFiles({
      'Normalize.js': 'src/components/share/Normalize.js'
    });
  }

  install() {
    this.addInstall();
  }
};
