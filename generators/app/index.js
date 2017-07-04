'use strict';

const path = require('path');
const chalk = require('chalk');
const yosay = require('yosay');
const _ = require('lodash');
const extend = _.merge;

const Base = require('./../base');
const writePkg = require('./utils/writePkg');

module.exports = class extends Base {
  initializing() {
    this.log(yosay(
      `Welcome to the cat\'s pajamas ${chalk.red('generator-cat')} generator!`
    ));

    this.state = {};
    this.addDevDependencies([
      'pre-commit',
      'concurrently'
    ]);
  }

  prompting() {
    return this.prompt([{
      name: 'name',
      message: 'Project name',
      default: path.basename(process.cwd()),
      filter: _.kebabCase,
      validate: str => str.length > 0 ? true : 'Can not empty.',
      when: !this.getPkg.name
    }, {
      name: 'description',
      message: 'Description',
      validate: str => str.length > 0 ? true : 'Can not empty.',
      when: !this.getPkg.description
    }, {
      name: 'homepage',
      message: 'Github url',
      validate: str => str.length > 0 ? true : 'Can not empty.',
      when: !this.getPkg.homepage
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
      filter: words => words.split(/\s*,\s*/g)
    }, {
      type: 'confirm',
      name: 'website',
      message: 'Make a website',
      default: true,
      store: true
    }, {
      type: 'list',
      name: 'type',
      message: 'Choose a type',
      default: 0,
      store: true,
      choices: ({website}) => {
        if(website)
          return ['server', 'desktop app', 'docs'];

        return ['server', 'none'];
      }
    }, {
      type: 'confirm',
      name: 'graphql',
      message: 'Use graphql',
      default: true,
      store: true,
      when: ({website, type}) => website || type === 'server'
    }, {
      type: 'checkbox',
      name: 'plugins',
      message: 'Add other options',
      store: true,
      choices: ['npm', 'heroku', 'test']
    }]).then(function(state) {
      const {website, type, graphql, plugins} = state;

      if(type !== 'none')
        plugins.push(type);

      if(website) {
        plugins.push('react');

        if(graphql)
          plugins.push('relay');
      }

      this.config.set('plugins', plugins);
      this.state = extend(this.state, state);
    }.bind(this))
  }

  default() {
    // write pkg
    this.fs.writeJSON(
      this.destinationPath('package.json'),
      writePkg(
        this.state,
        this.fs.readJSON(this.destinationPath('package.json'), {})
      )
    );

    this.composeWith(require.resolve('./callSubgenerator'));
  }

  install() {
    this.addInstall(true);
  }

  end() {
    if(!this.options.skipInstall && this.state.type.length !== 0)
      this.spawnCommand('yarn', ['build']);

    this.log(yosay(
      'Meooooooow~~'
    ));
  }
};
