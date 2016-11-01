'use strict';

var generators = require('yeoman-generator');
var _ = require('lodash');
var extend = _.merge;

module.exports = generators.Base.extend({
  constructor: function() {
    generators.Base.apply(this, arguments);

    this.option('react', {
      type: Boolean,
      required: false,
      default: false,
      desc: 'Use react middleware'
    });
  },

  initializing: function() {
    this.props = {
      react: this.options.react
    };
  },

  prompting: {
    chooseType: function() {
      return this.prompt([{
        type: 'list',
        name: 'type',
        message: 'Choose server type',
        choices: ['http', 'https'],
        store: true
      }, {
        type: 'checkbox',
        name: 'middleware',
        message: 'Choose middleware',
        choices: [
          'cookie-parser',
          'cookie-session',
          'body-parser',
          'passport'
        ],
        store: true
      }]).then(function(props) {
        this.props = extend(this.props, props);
      }.bind(this));
    },

    addHttpsOptions: function() {
      return this.prompt([{
        name: 'domain',
        message: 'Domain name',
        when: this.props.type === 'https',
        store: true
      }, {
        name: 'email',
        message: 'Domain email',
        when: this.props.type === 'https',
        store: true
      }]).then(function(props) {
        this.props.https = extend(this.props.https, props);
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

    // copy files
    if(this.props.middleware.length !== 0) {
      this.fs.copyTpl(
        this.templatePath('middleware/middleware.js'),
        this.destinationPath('src/middleware/middleware.js'), {
          middleware: this.props.middleware
        }
      );
    }

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

    if(this.props.react) {
      this.fs.copy(
        this.templatePath('middleware/react.js'),
        this.destinationPath('src/middleware/react.js')
      );

      this.fs.copyTpl(
        this.templatePath('views.js'),
        this.destinationPath('src/routes/views.js'), {
          names: this.config.get('names') || []
        }
      );
    }
  },

  install: function() {
    if(this.options.skipInstall)
      return;

    var modules = [
      'add',
      'express',
      'nodemon',
      'pug',
      'compression',
      'errorhandler',
      'morgan',
      'response-time',
      'serve-favicon',
      'express-uncapitalize',
      'helmet'
    ];

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

    modules.push('--dev');
    this.spawnCommandSync('yarn', modules);
  }
});
