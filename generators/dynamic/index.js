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

  writing: function() {
    // write package.json
    var currentPkg = this.fs.readJSON(this.destinationPath('package.json'), {});
    var pkg = extend({
      scripts: {
        watch: 'concurrently -c green "npm run lint:watch" "npm run webpack-server" "npm run babel"',
        production: 'npm run babel && npm run webpack'
      },
      'pre-commit': [
        'lint',
        'test'
      ]
    }, currentPkg);

    this.fs.writeJSON(this.destinationPath('package.json'), pkg);

    // copy files
    this.fs.copy(
      this.templatePath('react.js'),
      this.destinationPath('src/middleware/react.js')
    );

    this.fs.copyTpl(
      this.templatePath('views.js'),
      this.destinationPath('src/routes/views/' + this.props.name + '.js'), {
        router: this.props.modules.indexOf('router') !== -1,
        redux: this.props.modules.indexOf('redux') !== -1,
        radium: this.props.modules.indexOf('radium') !== -1,
        name: this.props.name,
        componentName: this.props.name[0].toUpperCase() + this.props.name.slice(1)
      }
    );
  },

  default: function() {
    this.composeWith('cat:react', {
      options: {
        name: this.props.name,
        modules: this.props.modules,
        webpack: true,
        skipInstall: this.options.skipInstall
      }
    }, {
      local: require.resolve('../react')
    });

    this.composeWith('cat:pug', {
      options: {
        projectName: 'page',
        type: 'Dynamic pages',
        skipInstall: this.options.skipInstall
      }
    }, {
      local: require.resolve('../pug')
    });

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
