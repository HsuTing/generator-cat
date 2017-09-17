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
      `Welcome to the cat\'s pajamas ${chalk.red('generator-cat')} generator!` // eslint-disable-line no-useless-escape
    ));

    this.state = {};
    this.addDependencies([
      'cross-env'
    ]);
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
      validate: /* istanbul ignore next */ str => str.length > 0 ? true : 'Can not empty.',
      when: !this.getPkg.name
    }, {
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
    }, {
      type: 'confirm',
      name: 'private',
      message: 'Is a private project',
      default: false,
      store: true
    }, {
      type: 'confirm',
      name: 'website',
      message: 'Make a website',
      default: true,
      store: true
    }, {
      type: 'list',
      name: 'chooseType',
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
      when: ({website, chooseType}) => chooseType !== 'none'
    }, {
      type: 'checkbox',
      name: 'plugins',
      message: 'Add other options',
      store: true,
      choices: ({chooseType, graphql}) => [
        'npm',
        'heroku'
      ]
    }]).then(function(state) {
      const {website, chooseType, graphql, plugins} = state;

      if(state.private)
        plugins.push('private');

      if(chooseType !== 'none')
        plugins.push(chooseType);

      if(graphql)
        plugins.push('graphql');

      if(website) {
        plugins.push('react');

        if(graphql)
          plugins.push('relay');
      }

      this.config.set('plugins', plugins);
      this.state = extend(this.state, state);
    }.bind(this));
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
    /* istanbul ignore if */
    if(!this.options.skipInstall && /* istanbul ignore next */ this.state.chooseType.length !== 0)
      this.spawnCommand('yarn', ['build']);

    this.config.set('cat', true);
    this.log(yosay(
      'Meooooooow~~'
    ));
  }
};
