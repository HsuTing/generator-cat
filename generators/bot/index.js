'use strict';

var generators = require('yeoman-generator');
var _ = require('lodash');
var extend = _.merge;
var parseAuthor = require('parse-author');

module.exports = generators.Base.extend({
  initializing: function() {
    var pkg = this.fs.readJSON(this.destinationPath('package.json'), {});

    this.props = {
    };

    if(_.isObject(pkg.author)) {
      this.props.authorEmail = pkg.author.email;
    } else if(_.isString(pkg.author)) {
      var info = parseAuthor(pkg.author);

      this.props.authorEmail = info.email;
    }
  },

  /*
  prompting: function() {
    return this.prompt([{
      type: 'checkbox',
      name: 'modules',
      message: 'Choose modules',
      choices: ['router', 'redux', 'radium', {name: 'default component', checked: true}]
    }, {
      name: 'name',
      message: 'Main component name',
      default: 'index'
    }]).then(function(props) {
      this.props = extend(this.props, props);
    }.bind(this));
  },
  */

  writing: function() {
    // write package.json
    var currentPkg = this.fs.readJSON(this.destinationPath('package.json'), {});
    var pkg = extend({
      scripts: {
        watch: 'concurrently -c green "npm run lint:watch" "npm run babel:watch"'
      },
      'pre-commit': [
        'lint',
        'test'
      ]
    }, currentPkg);

    this.fs.writeJSON(this.destinationPath('package.json'), pkg);

    // copy files
    this.fs.copy(
      this.templatePath('api.js'),
      this.destinationPath('src/api/bot.js')
    );
  },

  default: function() {
    this.composeWith('cat:server', {
      options: {
        email: this.props.authorEmail,
        skipInstall: this.options.skipInstall
      }
    }, {
      local: require.resolve('../server')
    });
  },

  install: function() {
    this.npmInstall([
      'concurrently',
      'pre-commit'
    ], {saveDev: true});
  },

  end: function() {
    this.spawnCommand('npm', ['run', 'babel']);
  }
});
