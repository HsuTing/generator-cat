'use strict';

const path = require('path');
const generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const parseAuthor = require('parse-author');
const askName = require('inquirer-npm-name');
const _ = require('lodash');
const extend = _.merge;

module.exports = generator.extend({
  constructor: function() {
    generator.apply(this, arguments);

    this.log(yosay(
      `Welcome to the cat\'s pajamas ${chalk.red('generator-cat')} generator!`
    ));
  },

  initializing: function() {
    this.pkg = this.fs.readJSON(this.destinationPath('package.json'), {});

    this.props = {
      name: this.pkg.name,
      description: this.pkg.description,
      version: this.pkg.version,
      homepage: this.pkg.homepage
    };

    if(_.isObject(this.pkg.author)) {
      this.props.authorName = this.pkg.author.name;
      this.props.authorEmail = this.pkg.author.email;
      this.props.authorUrl = this.pkg.author.url;
    } else if(_.isString(this.pkg.author)) {
      const author = parseAuthor(this.pkg.author);

      this.props.authorName = author.name;
      this.props.authorEmail = author.email;
      this.props.authorUrl = author.url;
    }
  },

  prompting: {
    askForProjectName: function() {
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
      }, this).then(function(props) {
        this.props.name = props.name;
      }.bind(this));
    },

    askForPkg: function() {
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
        type: 'checkbox',
        name: 'type',
        message: 'Choose type',
        choices: [
          'website',
          'server',
          'npm'
        ],
        store: true
      }]).then(function(props) {
        this.props = extend(this.props, props);
      }.bind(this));
    }
  },

  default: {
    addPlugins: function() {
      const plugins = [];
      if(this.props.type.indexOf('website') !== -1) {
        plugins.push('react');

        if(this.props.type.indexOf('server') === -1) {
          plugins.push('websiteNoServer');
        }
      }

      this.props.plugins = plugins;
      this.config.set('plugins', plugins);
    },

    wirtePkg: function() {
      // script
      const build = ['yarn babel'];
      const production = ['export NODE_ENV=production', 'yarn babel'];
      const watch = ['concurrently -c green', '"yarn lint:watch"', '"yarn babel:watch"'];

      if(this.props.plugins.indexOf('react') !== -1) {
        if(this.props.plugins.indexOf('websiteNoServer') !== -1) {
          build.push('yarn static');
          production.push('yarn static');
        }

        production.push('yarn webpack')
        watch.push('"yarn webpack-server"')
      }

      // pkg
      const currentPkg = this.fs.readJSON(this.destinationPath('package.json'), {});
      const pkg = extend({
        name: _.kebabCase(this.props.name),
        version: '0.0.0',
        description: this.props.description,
        author: {
          name: this.props.authorName,
          email: this.props.authorEmail,
          url: this.props.authorUrl
        },
        scripts: {
          build: build.join(' && '),
          production: production.join(' && '),
          watch: watch.join(' ')
        },
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

      if(this.props.keywords)
        pkg.keywords = _.uniq(this.props.keywords.concat(pkg.keywords));

      this.fs.writeJSON(this.destinationPath('package.json'), pkg);
    },

    react: function() {
      if(this.props.plugins.indexOf('react') === -1)
        return;

      this.composeWith(require.resolve('./../template'));
      this.composeWith(require.resolve('./../react'));
      this.composeWith(require.resolve('./../add'), {
        item: 'component'
      });
    },

    npm: function() {
      if(this.props.type.indexOf('npm') === -1)
        return;

      this.composeWith(require.resolve('./../npm'));
    },

    normal: function() {
      if(!this.pkg.license)
        this.composeWith('generator-license/app', {
          name: this.props.authorName,
          email: this.props.authorEmail,
          website: this.props.authorUrl
        });

      this.composeWith(require.resolve('./../babel'));
      this.composeWith(require.resolve('./../eslint'));
      this.composeWith(require.resolve('./../bin'));
      this.composeWith(require.resolve('./../readme'));
    }
  },

  writing: {
    files: function() {
      this.fs.copy(
        this.templatePath('editorconfig'),
        this.destinationPath('.editorconfig')
      );

      this.fs.copy(
        this.templatePath('gitignore'),
        this.destinationPath('.gitignore')
      );
    }
  },

  install: function() {
    this.yarnInstall([
      'pre-commit',
      'concurrently'
    ], {dev: true});
  },

  end: function() {
    if(!this.options.skipInstall)
      this.spawnCommand('yarn', ['build']);

    this.log(yosay(
      'Meooooooow~~'
    ));
  }
});
