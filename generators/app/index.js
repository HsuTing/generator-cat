'use strict';

const generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
var parseAuthor = require('parse-author');
var _ = require('lodash');
var extend = _.merge;

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
          'server'
        ]
      }]).then(function(props) {
        this.props = extend(this.props, props);
      }.bind(this));
    },

    askForPlugins: function() {
      /* temp */
      return this.prompt([{
        type: 'checkbox',
        name: 'plugins',
        message: 'Choose plugins',
        choices: [{
          name: 'react',
          checked: this.props.type.indexOf('website') !== -1
        }, {
          name: 'websiteNoServer',
          checked: (
            this.props.type.indexOf('website') !== -1 &&
            this.props.type.indexOf('server') === -1
          )
        }]
      }]).then(function(props) {
        this.props = extend(this.props, props);
        this.config.set('plugins', props.plugins);
      }.bind(this));
    }
  }
});
