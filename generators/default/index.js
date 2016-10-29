'use strict';

var generators = require('yeoman-generator');
var _ = require('lodash');
var extend = _.merge;
var addModules = require('./../addModules');

module.exports = generators.Base.extend({
  writing: function() {
    // write package.json
    var currentPkg = this.fs.readJSON(this.destinationPath('package.json'), {});
    var pkg = extend({
      scripts: {
        watch: 'concurrently -c green "npm run lint:watch" "npm run babel:watch"'
      },
      'pre-commit': [
        'lint'
      ]
    }, currentPkg);

    this.fs.writeJSON(this.destinationPath('package.json'), pkg);

    // copy files
    this.fs.copyTpl(
      this.templatePath('README.md'),
      this.destinationPath('README.md'), {
        name: pkg.name[0].toUpperCase() + pkg.name.slice(1).toLowerCase()
      }
    );
  },

  default: function() {
    this.composeWith('cat:git', {
    }, {
      local: require.resolve('../git')
    });

    this.composeWith('cat:babel', {
      options: {
        alias: 'none:none'
      }
    }, {
      local: require.resolve('../babel')
    });

    this.composeWith('cat:eslint', {
      options: {
        alias: 'none:none'
      }
    }, {
      local: require.resolve('../eslint')
    });

    var modules = [
      'concurrently',
      'pre-commit'
    ];

    this.config.set(
      'modules:dev',
      addModules(
        this.config.get('modules:dev'),
        modules
      )
    );
  }
});
