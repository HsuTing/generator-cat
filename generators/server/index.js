'use strict';

var generators = require('yeoman-generator');
var _ = require('lodash');
var extend = _.merge;
var addModules = require('./../addModules');

module.exports = generators.Base.extend({
  constructor: function() {
    generators.Base.apply(this, arguments);

    this.option('type', {
      type: String,
      require: false,
      default: '',
      desc: 'Server type'
    });

    this.option('middleware', {
      type: String,
      require: false,
      default: '',
      desc: 'Server middleware (comma to split)'
    });

    this.option('domain', {
      type: String,
      require: false,
      default: '',
      desc: 'Https domain name'
    });

    this.option('email', {
      type: String,
      require: false,
      default: '',
      desc: 'Https domain email'
    });
  },

  initializing: function() {
    this.props = {
      type: this.options.type,
      middleware: this.options.middleware === '' ? [] : this.options.middleware.split(/\s*,\s*/g),
      https: {
        domain: this.options.domain,
        email: this.options.email
      }
    };

    if(this.config.get('server:type'))
      this.props.type = this.config.get('server:type');

    if(this.config.get('server:middleware'))
      this.props.middleware = this.config.get('server:middleware');

    if(this.config.get('server:https:domain'))
      this.props.https.email = this.config.get('server:https:domain');

    if(this.config.get('server:https:email'))
      this.props.https.email = this.config.get('server:https:email');
  },

  prompting: {
    chooseType: function() {
      return this.prompt([{
        type: 'list',
        name: 'type',
        message: 'Choose server type',
        choices: ['http', 'https'],
        default: 'http',
        when: this.props.type === ''
      }, {
        type: 'checkbox',
        name: 'middleware',
        message: 'Choose middleware',
        choices: [
          'compression',
          'body-parser',
          'cookie-parser',
          'cookie-session',
          'errorhandler',
          'morgan',
          'multer',
          'response-time',
          'serve-favicon',
          'express-uncapitalize',
          'helmet',
          'passport',
          'static-expiry'
        ],
        when: this.props.middleware.length === 0
      }]).then(function(props) {
        this.props = extend(this.props, props);

        this.config.set('server:type', this.props.type);
        this.config.set('server:middleware', this.props.middleware);
      }.bind(this));
    },

    addHttpsOptions: function() {
      return this.prompt([{
        name: 'domain',
        message: 'Domain name',
        when: this.props.type === 'https' && this.props.https.domain === ''
      }, {
        name: 'email',
        message: 'Domain email',
        default: this.options.email,
        when: this.props.type === 'https' && this.props.https.type === ''
      }]).then(function(props) {
        this.props.https = extend(this.props.https, props);

        this.config.set('server:https:domain', this.props.https.domain);
        this.config.set('server:https:email', this.props.https.email);
      }.bind(this));
    }
  },

  writing: function() {
    // write package.json
    var currentPkg = this.fs.readJSON(this.destinationPath('package.json'), {});
    var pkg = extend({
      scripts: {
        'test-server': 'nodemon ./lib/server.js',
        start: 'NODE_ENV=production node ./lib/server.js'
      }
    }, currentPkg);

    this.fs.writeJSON(this.destinationPath('package.json'), pkg);

    this.fs.copyTpl(
      this.templatePath('middleware.js'),
      this.destinationPath('src/middleware.js'), {
        middleware: this.props.middleware
      }
    );

    // copy files
    switch(this.props.type) {
      case 'http':
        this.fs.copyTpl(
          this.templatePath('http.js'),
          this.destinationPath('src/server.js')
        );
        break;

      case 'https':
        this.fs.copyTpl(
          this.templatePath('https.js'),
          this.destinationPath('src/server.js'), {
            middleware: this.props.middleware,
            https: this.props.https
          }
        );
        break;

      default:
        break;
    }
  },

  install: function() {
    const modules = ['express', 'nodemon', 'pug'];

    this.props.middleware.forEach(function(middleware) {
      modules.push(middleware.replace(/ /g, '-'));
    });

    if(this.props.type === 'https') {
      [
        'letsencrypt-express',
        'le-challenge-fs',
        'le-store-certbot',
        'redirect-https'
      ].forEach(function(module) {
        modules.push(module);
      });
    }

    this.config.set(
      'modules',
      addModules(
        this.config.get('modules'),
        modules
      )
    );
  }
});
