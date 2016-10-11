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

    this.option('license', {
      type: Boolean,
      required: false,
      defaults: true,
      desc: 'Include a license'
    });
  },

  initializing: function() {
    this.pkg = this.fs.readJSON(this.destinationPath('package.json'), {});

    this.props = {
      name: this.pkg.name,
      description: this.pkg.description,
      version: this.pkg.version,
      homepage: this.pkg.homepage,
      type: this.pkg.type,
      typeList: ['Static pages', 'Dynamic pages', 'Default'],
      react: false
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

    askForType: function() {
      return this.prompt([{
        type: 'list',
        name: 'type',
        message: 'Choose type',
        choices: this.props.typeList,
        default: this.props.typeList[0],
        when: !this.props.type || this.props.typeList.indexOf(this.props.type) === -1
      }]).then(function(props) {
        this.props = extend(this.props, props);
        switch(this.props.typeList.indexOf(props.type || this.props.type)) {
          case 0:
          case 1:
            this.props.react = true;
            break;

          default:
            this.props.react = false;
            break;
        }
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
      main: 'lib/index.js',
      keywords: [],
      type: this.props.type
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

    if(this.props.typeList.indexOf(pkg.type) === -1) {
      pkg.type = this.props.type;
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

    this.fs.copyTpl(
      this.templatePath('gitignore'),
      this.destinationPath('.gitignore'), {
        type: this.options.type
      }
    );
  },

  default: function() {
    this.composeWith('cat:babel', {
      options: {
        react: this.props.react,
        skipInstall: this.options.skipInstall
      }
    }, {
      local: require.resolve('../babel')
    });

    this.composeWith('cat:eslint', {
      options: {
        react: this.props.react,
        skipInstall: this.options.skipInstall
      }
    }, {
      local: require.resolve('../eslint')
    });

    if(this.options.license && !this.pkg.license) {
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

    this.composeWith('cat:test', {
      options: {
        skipInstall: this.options.skipInstall
      }
    }, {
      local: require.resolve('../test')
    });

    switch(this.props.typeList.indexOf(this.props.type)) {
      case 0:
        this.composeWith('cat:static', {
          options: {
            skipInstall: this.options.skipInstall
          }
        }, {
          local: require.resolve('../static')
        });
        break;

      case 1:
        this.composeWith('cat:dynamic', {
          options: {
            skipInstall: this.options.skipInstall
          }
        }, {
          local: require.resolve('../dynamic')
        });
        break;

      default:
        break;
    }
  },

  end: function() {
    this.log(yosay(
      'Meooooooow~~'
    ));
  }
});
