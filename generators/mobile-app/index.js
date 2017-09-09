'use strict';

const path = require('path');
const _ = require('lodash');
const extend = _.merge;

const Base = require('./../base');
const writePkg = require('./../app/utils/writePkg');

module.exports = class extends Base {
  initializing() {
    // remove not need
    const pkg = Object.assign({}, this.getPkg);
    pkg.scripts = Object.assign({}, this.getPkg.scripts);

    delete pkg.scripts.test;
    delete pkg.jest;

    this.spawnCommandSync('rm', ['-rf', this.destinationPath('App.test.js')]);
    this.fs.writeJSON(this.destinationPath('package.json'), pkg);

    // init
    this.state = {};
    this.addDevDependencies([
      'pre-commit',
      'jest',
      'babel-plugin-transform-object-assign',
      'babel-plugin-module-resolver',
      'babel-plugin-transform-decorators-legacy'
    ]);
  }

  prompting() {
    return this.prompt([{
      name: 'description',
      message: 'Description',
      validate: /* istanbul ignore next */ str => str.length > 0 ? true : 'Can not empty.',
      when: !this.getPkg.description
    }, {
      name: 'authorName',
      message: 'Author\'s Name',
      when: !this.getAuthor.name,
      default: this.user.git.name(),
      store: true
    }, {
      name: 'authorEmail',
      message: 'Author\'s Email',
      when: !this.getAuthor.email,
      default: this.user.git.email(),
      store: true
    }, {
      name: 'authorUrl',
      message: 'Author\'s Homepage',
      when: !this.getAuthor.email,
      store: true
    }, {
      name: 'keywords',
      message: 'Package keywords (comma to split)',
      when: !this.getPkg.keywords,
      filter: /* istanbul ignore next */ words => words.split(/\s*,\s*/g)
    }]).then(function(state) {
      const plugins = [
        'react',
        'mobile app',
        'test'
      ];

      state.plugins = plugins;
      this.config.set('plugins', plugins);
      this.state = extend(this.state, state);
    }.bind(this));
  }

  default() {
    /* istanbul ignore next */
    if(!this.getPkg.license)
      this.composeWith('generator-license/app', {
        name: this.getAuthor.name || this.state.authorName,
        email: this.getAuthor.email || this.state.authorEmail,
        website: this.getAuthor.url || this.state.authorUrl,
        defaultLicense: 'MIT'
      });

    this.composeWith(require.resolve('./../eslint'));
    this.composeWith(require.resolve('./../test'), {
      skipInstall: true
    });
  }

  writing() {
    // write pkg
    this.fs.writeJSON(
      this.destinationPath('package.json'),
      writePkg(Object.assign({},
        this.getPkg,
        this.state
      ), this.fs.readJSON(this.destinationPath('package.json'), {}))
    );

    // copy files
    this.fs.copy(
      path.resolve(__dirname, './../app/templates/editorconfig'),
      this.destinationPath('.editorconfig')
    );

    this.fs.copyTpl(
      path.resolve(__dirname, './../app/templates/gitignore'),
      this.destinationPath('.gitignore'), {
        server: this.checkPlugins('server'),
        react: this.checkPlugins('react'),
        relay: this.checkPlugins('relay'),
        test: this.checkPlugins('test'),
        mobile_app: this.checkPlugins('mobile app')
      }
    );

    this.writeFiles({
      'App.js': 'App.js',
      'Component.js': 'src/components/App.js',
      babelrc: '.babelrc',
      'test-app.js': 'src/__tests__/App.js'
    });
  }

  install() {
    this.addInstall(true);
  }

  end() {
    this.config.set('cat', true);
  }
};
