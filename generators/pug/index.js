'use strict';

var generators = require('yeoman-generator');
var _ = require('lodash');
var extend = _.merge;
var parseAuthor = require('parse-author');

module.exports = generators.Base.extend({
  constructor: function() {
    generators.Base.apply(this, arguments);

    this.option('server', {
      type: Boolean,
      required: false,
      default: false,
      desc: 'Need server'
    });

    this.option('domain', {
      type: String,
      required: false,
      default: '',
      desc: 'Domain name'
    });
  },

  initializing: function() {
    var pkg = this.fs.readJSON(this.destinationPath('package.json'), {});

    this.props = {
      name: pkg.name,
      description: pkg.description,
      homepage: pkg.homepage,
      names: this.config.get('names') || [],
      server: this.options.server,
      domain: this.options.domain
    };

    if(_.isObject(pkg.author)) {
      this.props.authorName = pkg.author.name;
      this.props.authorEmail = pkg.author.email;
      this.props.authorUrl = pkg.author.url;
    } else if(_.isString(pkg.author)) {
      var info = parseAuthor(pkg.author);

      this.props.authorName = info.name;
      this.props.authorEmail = info.email;
      this.props.authorUrl = info.url;
    }
  },

  prompting: {
    askForUtils: function() {
      return this.prompt([{
        type: 'checkbox',
        name: 'utils',
        message: 'Choose pug utils',
        choices: ['facebook', 'google'],
        store: true
      }]).then(function(props) {
        this.props = extend(this.props, props);
      }.bind(this));
    },

    askForSocials: function() {
      return this.prompt([{
        type: 'checkbox',
        name: 'socials',
        message: 'Choose social tools',
        choices: ['facebook', 'googlePlus', 'twitter'],
        store: true
      }]).then(function(props) {
        this.props = extend(this.props, props);
      }.bind(this));
    },

    askForFacebook: function() {
      return this.prompt([{
        name: 'appId',
        message: 'Facebook appId',
        store: true
      }, {
        name: 'version',
        message: 'Facebook api version',
        when: this.props.utils.indexOf('facebook') !== -1,
        store: true
      }]).then(function(props) {
        this.props.facebook = extend(this.props.facebook, props);
      }.bind(this));
    },

    askForGoogle: function() {
      return this.prompt([{
        name: 'verification',
        message: 'Google verification',
        store: true
      }, {
        name: 'id',
        message: 'Google analytics id',
        when: this.props.utils.indexOf('google') !== -1,
        store: true
      }]).then(function(props) {
        this.props.google = extend(this.props.google, props);
      }.bind(this));
    }
  },

  write: function() {
    this.props.names.forEach(function(name) {
      this.fs.copyTpl(
        this.templatePath('page.pug'),
        this.destinationPath('views/' + name + '.pug'), {
          name: name,
          testDomain: this.props.server ? 'http://localhost:8000' : 'http://localhost',
          domain: this.props.domain,
          authorUrl: this.props.authorUrl,
          homepage: this.props.homepage,
          utils: this.props.utils,
          socials: this.props.socials
        }
      );
    }.bind(this));

    ['meta',
      'favicon'
    ].forEach(function(util) {
      this.fs.copyTpl(
        this.templatePath('head/' + util + '.pug'),
        this.destinationPath('views/head/' + util + '.pug'),
        this.props
      );
    }.bind(this));

    this.props.socials.forEach(function(util) {
      this.fs.copyTpl(
        this.templatePath('head/social/' + util + '.pug'),
        this.destinationPath('views/head/social/' + util + '.pug'),
        this.props
      );
    }.bind(this));

    this.props.utils.forEach(function(util) {
      this.fs.copyTpl(
        this.templatePath('utils/' + util + '.pug'),
        this.destinationPath('views/utils/' + util + '.pug'),
        this.props
      );
    }.bind(this));
  },

  install: function() {
    if(this.options.skipInstall)
      return;

    this.spawnCommandSync('yarn', ['add', 'pug', '--dev']);
  }
});
