'use strict';

const path = require('path');
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const parseAuthor = require('parse-author');
const _ = require('lodash');
const extend = _.merge;

const addPlugins = require('./addPlugins');
const writePkg = require('./writePkg');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.log(yosay(
      `Welcome to the cat\'s pajamas ${chalk.red('generator-cat')} generator!`
    ));
  }

  initializing() {
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
  }

  prompting() {
    return this.prompt([{
      name: 'name',
      message: 'Project name',
      default: path.basename(process.cwd()),
      filter: _.kebabCase,
      validate: str => {
        return str.length > 0;
      },
      when: !this.props.name
    }, {
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
      filter: words => {
        return words.split(/\s*,\s*/g);
      }
    }, {
      type: 'checkbox',
      name: 'type',
      message: 'Choose type',
      choices: [
        'website',
        'server',
        'graphql',
        'npm',
        'heroku',
        'docs'
      ],
      store: true,
      validate: choices => {
        return !(
          choices.indexOf('website') !== -1 &&
          choices.indexOf('server') === -1 &&
          choices.indexOf('graphql') !== -1
        );
      }
    }]).then(function(props) {
      this.props = extend(this.props, props);
    }.bind(this))
  }

  default() {
    // add plugins
    this.props.plugins = addPlugins(this.props.type);
    this.config.set('plugins', this.props.plugins);

    // write pkg
    this.fs.writeJSON(
      this.destinationPath('package.json'),
      writePkg(
        this.props,
        this.fs.readJSON(this.destinationPath('package.json'), {})
      )
    );

    // other subgenerator
    if(this.props.plugins.indexOf('react') !== -1) {
      this.composeWith(require.resolve('./../template'));
      this.composeWith(require.resolve('./../react'));
      this.composeWith(require.resolve('./../add'), {
        item: this.props.plugins.indexOf('relay') === -1 ? 'component' : 'relay'
      });
    }

    if(this.props.plugins.indexOf('graphql') !== -1)
      this.composeWith(require.resolve('./../add'), {
        item: 'schema'
      });

    if(this.props.plugins.indexOf('relay') !== -1)
      this.composeWith(require.resolve('./../graphql'));

    if(this.props.type.indexOf('server') !== -1)
      this.composeWith(require.resolve('./../server'));

    if(this.props.type.indexOf('npm') !== -1)
      this.composeWith(require.resolve('./../npm'));

    // normal subgenerator
    if(!this.pkg.license)
      this.composeWith('generator-license/app', {
        name: this.props.authorName,
        email: this.props.authorEmail,
        website: this.props.authorUrl
      });

    this.composeWith(require.resolve('./../babel'));
    this.composeWith(require.resolve('./../eslint'));
    this.composeWith(require.resolve('./../readme'));
  }

  writing() {
    // files
    this.fs.copy(
      this.templatePath('editorconfig'),
      this.destinationPath('.editorconfig')
    );

    this.fs.copy(
      this.templatePath('gitignore'),
      this.destinationPath('.gitignore')
    );


    // static
    if(this.props.plugins.indexOf('websiteNoServer') !== -1)
      this.fs.copyTpl(
        this.templatePath('static.config.js'),
        this.destinationPath('static.config.js'), {
          docs: this.props.plugins.indexOf('docs') !== -1
        }
      );
  }

  install() {
    this.yarnInstall([
      'pre-commit',
      'concurrently'
    ], {dev: true});
  }

  end() {
    if(!this.options.skipInstall && this.props.type.length !== 0)
      this.spawnCommand('yarn', ['build']);

    this.log(yosay(
      'Meooooooow~~'
    ));
  }
};
