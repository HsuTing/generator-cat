'use strict';

var generators = require('yeoman-generator');
var _ = require('lodash');
var extend = _.merge;
var addModules = require('./../addModules');

module.exports = generators.Base.extend({
  initializing: function() {
    this.props = {
      names: '',
      router: false,
      redux: false,
      alias: [
        'public:public',
        'components:components',
        'componentsShare:components/share',
        'componentsShareRadium:components/share/radium',
        'utils:utils',
        'constants:constants',
        'containers:containers'
      ],
      structure: [
        'components',
        'public',
        'constants',
        'utils',
        'containers'
      ]
    };

    if(this.config.get('js'))
      this.props.names = this.config.get('js');

    if(this.config.get('router'))
      this.props.router = this.config.get('router');

    if(this.config.get('redux'))
      this.props.redux = this.config.get('redux');

    if(this.config.get('alias'))
      this.props.alias = this.config.get('alias');
  },

  prompting: {
    askForNames: function() {
      return this.prompt([{
        name: 'names',
        message: 'Main js names (comma to split)',
        default: 'index',
        when: this.props.names.length === 0,
        filter: function(words) {
          if(words === '')
            return [];

          return words.split(/\s*,\s*/g);
        }
      }]).then(function(props) {
        this.props = extend(this.props, props);

        this.config.set('js', this.props.names);
        this.props.names = this.props.names.join(',');
      }.bind(this));
    },

    askForModules: function() {
      return this.prompt([{
        type: 'confirm',
        name: 'router',
        message: 'Use react-router',
        default: true,
        when: !this.props.router
      }, {
        type: 'confirm',
        name: 'redux',
        message: 'Use redux and react-redux',
        default: true,
        when: !this.props.redux
      }]).then(function(props) {
        this.props = extend(this.props, props);

        if(this.props.router) {
          [
            'reducers:reducers',
            'actions:actions',
            'stores:stores'
          ].forEach(function(alias) {
            if(this.props.alias.indexOf(alias) === -1)
              this.props.alias.push(alias);
          }.bind(this));

          this.props.structure.push(
            'reducers',
            'actions',
            'stores'
          );
        }

        this.config.set('router', this.props.router);
        this.config.set('redux', this.props.redux);
        this.config.set('alias', this.props.alias);

        this.props.alias = this.props.alias.join(',');
      }.bind(this));
    }
  },

  writing: function() {
    // write package.json
    var currentPkg = this.fs.readJSON(this.destinationPath('package.json'), {});
    var pkg = extend({
      scripts: {
        build: 'npm run babel && npm run static',
        'build:production': 'npm run babel && NODE_ENV=production npm run static',
        watch: 'concurrently -c green "npm run lint:watch" "npm run webpack-server"'
      },
      'pre-commit': [
        'build:production',
        'lint'
      ]
    }, currentPkg);

    this.fs.writeJSON(this.destinationPath('package.json'), pkg);

    // copy files
    this.fs.copyTpl(
      this.templatePath('config.js'),
      this.destinationPath('static.config.js'), {
        names: this.props.names.split(/\s*,\s*/g)
      }
    );
  },

  default: function() {
    this.composeWith('cat:react', {
      options: {
        names: this.props.names,
        routers: this.props.routers,
        redux: this.props.redux
      }
    }, {
      local: require.resolve('../react')
    });

    this.composeWith('cat:webpack', {
      options: {
        names: this.props.names,
        routers: this.props.routers,
        redux: this.props.redux
      }
    }, {
      local: require.resolve('../webpack')
    });

    this.composeWith('cat:pug', {
      options: {
        names: this.props.names
      }
    }, {
      local: require.resolve('../pug')
    });

    this.composeWith('cat:git', {
    }, {
      local: require.resolve('../git')
    });

    this.composeWith('cat:babel', {
      options: {
        alias: this.props.alias,
        react: true
      }
    }, {
      local: require.resolve('../babel')
    });

    this.composeWith('cat:eslint', {
      options: {
        alias: this.props.alias,
        react: true
      }
    }, {
      local: require.resolve('../eslint')
    });

    this.composeWith('cat:bin', {
      options: {
        modules: 'static'
      }
    }, {
      local: require.resolve('../bin')
    });

    this.composeWith('cat:readme', {
      options: {
        structure: this.props.structure.join(',')
      }
    }, {
      local: require.resolve('../readme')
    });

    var modules = [
      'concurrently',
      'mkdirp',
      'lodash',
      'cli-color',
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
