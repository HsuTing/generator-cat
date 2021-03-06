'use strict';

const Base = require('./../base');

module.exports = class extends Base {
  initializing() {
    this.addDevDependencies([
      'https://github.com/HsuTing/eslint-config-cat.git',
      'eslint',
      'eslint-watch',
      'eslint-config-google',
      'eslint-plugin-import',
      'eslint-import-resolver-babel-module',
      'babel-eslint'
    ], plugin => {
      switch(plugin) {
        case 'react': return ['eslint-plugin-react'];
      }
    });
  }

  writing() {
    this.writePkgScripts({
      lint: 'eslint --cache ./src --ext .js',
      'lint:watch': 'esw --cache ./src --ext .js -w --color'
    });

    this.writeFiles({
      'eslintrc.js': ['.eslintrc.js', {
        react: this.checkPlugins('react')
      }]
    });

    if(this.checkPlugins('relay')) {
      this.writeFiles({
        eslintignore: '.eslintignore'
      });
    }
  }

  install() {
    this.addInstall(true);
  }
};
