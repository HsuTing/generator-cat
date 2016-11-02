'use strict';

var path = require('path');
var generators = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var _ = require('lodash');
var extend = _.merge;
var parseAuthor = require('parse-author');
var askName = require('inquirer-npm-name');

module.exports = generators.Base.extend({
  constructor: function() {
    generators.Base.apply(this, arguments);

    this.log(yosay(
      'Welcome to the cat\'s pajamas ' + chalk.red('generator-cat') + ' generator!'
    ));
  },

  initializing: function() {
    this.pkg = this.fs.readJSON(this.destinationPath('package.json'), {});

    this.props = {
      name: this.pkg.name,
      description: this.pkg.description,
      version: this.pkg.version,
      homepage: this.pkg.homepage,
      names: this.config.get('names') || []
    };

    if(_.isObject(this.pkg.author)) {
      this.props.authorName = this.pkg.author.name;
      this.props.authorEmail = this.pkg.author.email;
      this.props.authorUrl = this.pkg.author.url;
    } else if(_.isString(this.pkg.author)) {
      var info = parseAuthor(this.pkg.author);

      this.props.authorName = info.name;
      this.props.authorEmail = info.email;
      this.props.authorUrl = info.url;
    }
  },

  prompting: {
    askForModuleName: function() {
      if(this.pkg.name || this.options.name) {
        this.props.name = this.pkg.name || _.kebabCase(this.options.name);
        return;
      }

      return askName({
        name: 'name',
        message: 'Module Name',
        default: path.basename(process.cwd()),
        filter: _.kebabCase,
        validate: function(str) {
          return str.length > 0;
        }
      }, this).then(function(answer) {
        this.props.name = answer.name;
      }.bind(this));
    },

    askFor: function() {
      return this.prompt([{
        name: 'description',
        message: 'Description',
        when: !this.props.description
      }, {
        name: 'homepage',
        message: 'Github url',
        when: !this.props.homepage
      }, {
        name: 'authorName',
        message: 'Author\'s Name',
        when: !this.props.authorName,
        default: this.user.git.name(),
        store: true
      }, {
        name: 'authorEmail',
        message: 'Author\'s Email',
        when: !this.props.authorEmail,
        default: this.user.git.email(),
        store: true
      }, {
        name: 'authorUrl',
        message: 'Author\'s Homepage',
        when: !this.props.authorUrl,
        store: true
      }, {
        name: 'keywords',
        message: 'Package keywords (comma to split)',
        when: !this.pkg.keywords,
        filter: function(words) {
          return words.split(/\s*,\s*/g);
        }
      }]).then(function(props) {
        this.props = extend(this.props, props);
      }.bind(this));
    },

    askForNpm: function() {
      return this.prompt([{
        type: 'confirm',
        name: 'isNeeded',
        message: '".npmignore" is needed',
        store: true
      }, {
        type: 'confirm',
        name: 'publichToNpm',
        message: 'This package will pulish to npm',
        store: true
      }]).then(function(props) {
        this.props.npm = extend(this.props.npm, props);
      }.bind(this));
    },

    askForDomain: function() {
      return this.prompt([{
        name: 'domain',
        message: 'Domain name(need to add "http" or "https")',
        filter: function(words) {
          return words === '' ? 'http://localhost' : words;
        },
        store: true
      }]).then(function(props) {
        this.props = extend(this.props, props);
      }.bind(this));
    },

    askForWebsite: function() {
      return this.prompt([{
        type: 'confirm',
        name: 'website',
        message: 'Use for website',
        store: true
      }]).then(function(props) {
        this.props = extend(this.props, props);
      }.bind(this));
    },

    askForReact: function() {
      return this.prompt([{
        type: 'confirm',
        name: 'router',
        message: 'Use react-router',
        when: this.props.website,
        store: true
      }, {
        type: 'confirm',
        name: 'redux',
        message: 'Use react-redux',
        when: this.props.website,
        store: true
      }]).then(function(props) {
        this.props.reactPlugin = extend(this.props.reactPlugin, props);
      }.bind(this));
    },

    askForServer: function() {
      return this.prompt([{
        type: 'confirm',
        name: 'server',
        message: 'Need server',
        store: true
      }]).then(function(props) {
        this.props = extend(this.props, props);
      }.bind(this));
    },

    askForNames: function() {
      return this.prompt([{
        name: 'names',
        message: 'Main js file names (comma to split)',
        when: this.props.website && this.props.names.length === 0,
        filter: function(words) {
          if(words === '')
            return [];

          return words.split(/\s*,\s*/g);
        }
      }]).then(function(props) {
        if(props.names && props.names.length === 0)
          props.names = ['index'];

        this.props = extend(this.props, props);

        if(props.names)
          this.config.set('names', props.names);
      }.bind(this));
    }
  },

  configuring: function() {
    // write .yo_rc.json
    var alias = [
      {key: 'utils', value: 'utils'},
      {key: 'constants', value: 'constants'}
    ];

    // if just website
    if(this.props.website) {
      alias.push(
        {key: 'public', value: 'public'},
        {key: 'components', value: 'components'},
        {key: 'componentsShare', value: 'components/share'},
        {key: 'componentsShareRadium', value: 'components/share/radium'}
      );

      this.props.names.forEach(function(name) {
        var componentName = name[0].toUpperCase() + name.slice(1).toLowerCase();

        alias.push(
          {
            key: 'components' + componentName,
            value: 'components/' + name
          }
        );
      });

      if(this.props.reactPlugin.router || this.props.reactPlugin.redux) {
        alias.push(
          {key: 'containers', value: 'containers'}
        );
      }

      if(this.props.reactPlugin.redux) {
        alias.push(
          {key: 'reducers', value: 'reducers'},
          {key: 'actions', value: 'actions'},
          {key: 'stores', value: 'stores'}
        );
      }
    }

    // if just server
    if(this.props.server) {
      alias.push(
        {key: 'routes', value: 'routes'},
        {key: 'middleware', value: 'middleware'}
      );
    }

    this.config.set('alias', alias);
  },

  writing: function() {
    var scripts = {};

    if(this.props.website) {
      if(this.props.server) {
        scripts.production = 'yarn babel && yarn webpack && yarn start';
        scripts.watch = 'concurrently -c green "yarn lint:watch" "yarn babel:watch" "yarn webpack-server"';
      } else {
        scripts.build = 'yarn babel && yarn static';
        scripts.production = 'yarn babel && NODE_ENV=production yarn static && yarn webpack';
        scripts.watch = 'concurrently -c green "yarn lint:watch" "yarn webpack-server"';
      }
    }

    // write package.json
    var currentPkg = this.fs.readJSON(this.destinationPath('package.json'), {});
    var pkg = extend({
      name: _.kebabCase(this.props.name),
      version: '0.0.0',
      description: this.props.description,
      author: {
        name: this.props.authorName,
        email: this.props.authorEmail,
        url: this.props.authorUrl
      },
      scripts: scripts,
      main: './lib/index.js',
      keywords: [],
      'pre-commit': [
        'lint'
      ]
    }, currentPkg);

    if(this.props.homepage) {
      pkg.homepage = this.props.homepage;
      pkg.repository = {
        type: 'git',
        url: 'git+' + this.props.homepage + '.git'
      };
      pkg.bugs = {
        url: this.props.homepage + '/issues'
      };
    }

    if(this.props.keywords) {
      pkg.keywords = _.uniq(this.props.keywords.concat(pkg.keywords));
    }

    this.fs.writeJSON(this.destinationPath('package.json'), pkg);

    // copy files
    this.fs.copy(
      this.templatePath('editorconfig'),
      this.destinationPath('.editorconfig')
    );
  },

  defualt: function() {
    // default subgenerator
    if(!this.pkg.license) {
      this.composeWith('license', {
        options: {
          name: this.props.authorName,
          email: this.props.authorEmail,
          website: this.props.authorUrl
        }
      }, {
        local: require.resolve('generator-license/app')
      });
    }

    this.composeWith('git', {
      options: {
        server: this.props.server,
        isNeeded: this.props.npm.isNeeded,
        publichToNpm: this.props.npm.publichToNpm
      }
    }, {
      local: require.resolve('./../git')
    });

    this.composeWith('babel', {
      options: {
        skipInstall: this.options.skipInstall,
        react: this.props.website
      }
    }, {
      local: require.resolve('./../babel')
    });

    this.composeWith('eslint', {
      options: {
        skipInstall: this.options.skipInstall,
        react: this.props.website
      }
    }, {
      local: require.resolve('./../eslint')
    });

    this.composeWith('bin', {
      options: {
        skipInstall: this.options.skipInstall,
        needStatic: this.props.website && !this.props.server
      }
    }, {
      local: require.resolve('./../bin')
    });

    // custom subgenerator
    if(this.props.website) {
      this.composeWith('pug', {
        options: {
          server: this.props.server,
          domain: this.props.domain,
          skipInstall: this.options.skipInstall
        }
      }, {
        local: require.resolve('./../pug')
      });

      this.composeWith('react', {
        options: {
          skipInstall: this.options.skipInstall,
          router: this.props.reactPlugin.router,
          redux: this.props.reactPlugin.redux
        }
      }, {
        local: require.resolve('./../react')
      });

      this.composeWith('webpack', {
        options: {
          skipInstall: this.options.skipInstall,
          router: this.props.reactPlugin.router,
          redux: this.props.reactPlugin.redux
        }
      }, {
        local: require.resolve('./../webpack')
      });
    }

    if(this.props.server) {
      this.composeWith('server', {
        options: {
          react: this.props.website,
          domain: this.props.domain,
          skipInstall: this.options.skipInstall
        }
      }, {
        local: require.resolve('./../server')
      });
    }
  },

  install: function() {
    if(this.options.skipInstall)
      return;

    this.spawnCommandSync('yarn', [
      'add',
      'pre-commit',
      'concurrently',
      '--dev'
    ]);
  },

  end: function() {
    if(this.props.website && !this.props.server)
      this.spawnCommand('yarn', ['build']);
    else
      this.spawnCommand('yarn', ['babel']);

    this.log(yosay(
      'Meooooooow~~'
    ));
  }
});
