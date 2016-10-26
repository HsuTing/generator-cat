'use strict';

var generators = require('yeoman-generator');
var _ = require('lodash');
var extend = _.merge;
var addModules = require('./../addModules');

module.exports = generators.Base.extend({
  constructor: function() {
    generators.Base.apply(this, arguments);

    this.option('alias', {
      type: String,
      required: false,
      default: '',
      desc: 'Alias in babel (comma to split)'
    });

    this.option('react', {
      type: Boolean,
      required: false,
      default: false,
      desc: 'Use react'
    });
  },

  initializing: function() {
    this.props = {
      alias: this.options.alias === '' ? [] : this.options.alias.split(/\s*,\s*/g),
      react: this.options.react
    };

    if(this.config.get('alias'))
      this.props.alias = this.config.get('alias');

    if(this.config.get('react'))
      this.props.react = this.config.get('react');
  },

  prompting: function() {
    return this.prompt([{
      name: 'alias',
      message: 'Alias in babel (comma to split and write like `key: value`)',
      when: this.props.alias.length === 0,
      filter: function(words) {
        if(words === '')
          return [];

        return words.split(/\s*,\s*/g);
      }
    }]).then(function(props) {
      this.props = extend(this.props, props);

      this.config.set('alias', this.props.alias);
    }.bind(this));
  },

  write: function() {
    this.fs.copyTpl(
      this.templatePath('eslintrc.js'),
      this.destinationPath('.eslintrc.js'), {
        react: this.props.react,
        alias: this.props.alias.map(function(item) {
          var split = item.split(/\s*:\s*/g);

          return {
            key: split[0],
            value: split[1]
          };
        })
      }
    );

    var currentPkg = this.fs.readJSON(this.destinationPath('package.json'), {});
    var pkg = extend({
      scripts: {
        lint: 'eslint --cache ./src ./bin --ext .js',
        'lint:watch': 'esw --cache ./src ./bin --ext .js -w --color'
      }
    }, currentPkg);

    this.fs.writeJSON(this.destinationPath('package.json'), pkg);
  },

  default: function() {
    var modules = [
      'eslint',
      'eslint-watch',
      'eslint-config-google',
      'eslint-plugin-import',
      'eslint-import-resolver-babel-module',
      'babel-eslint'
    ];

    if(this.props.react)
      modules.push('eslint-plugin-react');

    this.config.set(
      'modules:dev',
      addModules(
        this.config.get('modules:dev'),
        modules
      )
    );
  }
});
