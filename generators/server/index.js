'use strict';

var generators = require('yeoman-generator');
var _ = require('lodash');
var extend = _.merge;

module.exports = generators.Base.extend({
  constructor: function() {
    generators.Base.apply(this, arguments);

    this.option('email', {
      type: String,
      require: false,
      default: '',
      desc: 'Domain email'
    });
  },

  initializing: function() {
    this.props = {};
  },

  prompting: {
    chooseType: function() {
      return this.prompt([{
        type: 'list',
        name: 'type',
        message: 'Choose server type',
        choices: ['http', 'https'],
        default: 'http'
      }, {
        type: 'checkbox',
        name: 'middleware',
        message: 'Choose middleware',
        choices: [
          'cookie parser',
          'body parser',
          'connect multiparty'
        ]
      }, {
        type: 'checkbox',
        name: 'custom',
        message: 'Choose custom middleware',
        choices: [
          'info',
          'blacklist'
        ]
      }]).then(function(props) {
        this.props = extend(this.props, props);
      }.bind(this));
    },

    addOptions: function() {
      return this.prompt([{
        name: 'cookieIDs',
        message: 'Cookie names (comma to split)',
        default: 'id',
        when: this.props.middleware.indexOf('cookie parser') !== -1,
        filter: function(words) {
          return words.split(/\s*,\s*/g);
        }
      }]).then(function(props) {
        this.props = extend(this.props, props);
      }.bind(this));
    },

    addHttpsOptions: function() {
      return this.prompt([{
        name: 'domain',
        message: 'Domain name',
        when: this.props.type === 'https'
      }, {
        name: 'email',
        message: 'Domain email',
        default: this.options.email,
        when: this.props.type === 'https'
      }]).then(function(props) {
        this.props = extend(this.props, props);
      }.bind(this));
    }
  },

  writing: function() {
    // write package.json
    var currentPkg = this.fs.readJSON(this.destinationPath('package.json'), {});

    var pkg = extend({
      scripts: {
        'test-server': 'nodemon ./lib/server.js',
        start: 'NODE_ENV=1 node ./lib/server.js'
      }
    }, currentPkg);

    this.fs.writeJSON(this.destinationPath('package.json'), pkg);

    // copy files
    this.props.custom.forEach(function(middleware) {
      this.fs.copy(
        this.templatePath('middleware/' + middleware + '.js'),
        this.destinationPath('src/middleware/' + middleware + '.js')
      );
    }.bind(this));

    switch(this.props.type) {
      case 'http':
        this.fs.copyTpl(
          this.templatePath('http.js'),
          this.destinationPath('src/server.js'),
          this.props
        );
        break;

      case 'https':
        this.fs.copyTpl(
          this.templatePath('https.js'),
          this.destinationPath('src/server.js'),
          this.props
        );
        break;

      default:
        break;
    }
  },

  install: function() {
    const modules = ['express', 'nodemon', 'compression'];

    this.props.middleware.forEach(function(middleware) {
      modules.push(middleware.replace(/ /g, '-'));
    });

    switch(this.props.type) {
      case 'http':
        break;

      case 'https':
        [
          'letsencrypt-express',
          'le-challenge-fs',
          'le-store-certbot',
          'redirect-https'
        ].forEach(function(module) {
          modules.push(module);
        });
        break;

      default:
        break;
    }

    this.npmInstall(modules, {saveDev: true});
  }
});
