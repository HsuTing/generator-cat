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

    this.option('type', {
      type: String,
      required: false,
      default: '',
      desc: 'Choose type'
    });
  },

  initializing: function() {
    this.pkg = this.fs.readJSON(this.destinationPath('package.json'), {});

    this.props = {
      name: this.pkg.name,
      description: this.pkg.description,
      version: this.pkg.version,
      type: this.options.type.toLowerCase(),
      homepage: this.pkg.homepage
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

    askForType: function() {
      return this.prompt([{
        type: 'list',
        name: 'type',
        message: 'Choose type',
        choices: ['static', 'dynamic', 'bot', 'install', 'default'],
        default: 'default',
        when: this.props.type === ''
      }]).then(function(props) {
        this.props = extend(this.props, props);
      }.bind(this));
    }
  },

  writing: function() {
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
      main: './lib/index.js',
      keywords: []
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

    switch(this.props.type) {
      case 'static':
        this.composeWith('cat:static', {
        }, {
          local: require.resolve('../static')
        });
        break;

      case 'install':
        break;

      default:
        this.composeWith('cat:default', {
        }, {
          local: require.resolve('../default')
        });
        break;
    }
  },

  end: function() {
    this.log(yosay(
      'Meooooooow~~'
    ));

    if(this.options.skipInstall)
      return;

    if(this.config.get('modules') && this.config.get('modules').length !== 0)
      this.spawnCommand('yarn',
        ['add'].concat(this.config.get('modules') || [])
      );

    if(this.config.get('modules:dev') && this.config.get('modules:dev').length !== 0)
      this.spawnCommand('yarn',
        ['add'].concat(this.config.get('modules:dev') || []).concat(['--dev'])
      );
  }
});
