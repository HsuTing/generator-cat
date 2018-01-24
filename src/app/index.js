// @flow
'use strict';

import path from 'path';
import _ from 'lodash';
import {isURL} from 'validator';

import Base from 'utils/Base';

/**
 * The root of generator-cat.
 * Use to set default setting.
 *
 * @param {String | Array} args
 * @param {Object} options
*/
module.exports = class App extends Base {
  username: string
  type: string = 'none'
  state: {
    name?: string,
    description?: string,
    keywords?: Array<string>,
    author?: {
      name: string,
      email: string,
      url: string
    }
  } = {}

  /**
   * The start of app Generator.
  */
  initializing() {
    this.meow`Hi {green ${this.user.git.name()}}! Welcome to {red cat} project.`;
  }

  /**
   * Use to ask the default information of the project
  */
  askDefaultInfo = async () => {
    const result: {
      name: string,
      description: string,
      keywords: Array<string>
    } = await this.prompt([{
      name: 'name',
      message: 'Project name',
      default: path.basename(process.cwd()),
      filter: _.kebabCase,
      validate: str => str.length > 0 ? true : 'can not be empty.',
      when: !this.pkg.name
    }, {
      name: 'description',
      message: 'Project description',
      validate: str => str.length > 0 ? true : 'can not be empty.',
      when: !this.pkg.description
    }, {
      name: 'keywords',
      message: 'Project keywords (comma to split)',
      filter: words => words.split(/\s*,\s*/g).filter(word => word !== ''),
      when: !this.pkg.keywords
    }]);

    this.state = {
      ...this.state,
      ...result
    };
  }

  /**
   * Use to ask the author info of the project
  */
  askAuthorInfo = async () => {
    const {
      author_name: name,
      author_email: email,
      author_url: url
    }: {
      author_name: string,
      author_email: string,
      author_url: string
    } = await this.prompt([
      'name',
      'email',
      'url'
    ].map((
      name: string
    ) => ({
      name: `author_${name}`,
      message: `Author's ${name}`,
      default: () => {
        if(name === 'url')
          return '';

        return this.user.git[name]();
      },
      validate: str => {
        if(name === 'url')
          return isURL(str) ? true : 'this is not a url';

        return str.length > 0 ? true : 'can not be empty.';
      },
      when: !this.pkg.author[name],
      store: true
    })));

    this.state = {
      ...this.state,
      author: {
        name,
        email,
        url
      }
    };
  }

  /**
   * Ask for the configureType of the project
  */
  askConfigure = async () => {
    const {
      type,
      ...configure
    }: {
      type: string,
      addons: Array<string>
    } = await this.prompt([{
      type: 'list',
      name: 'type',
      message: 'Choose a type',
      default: 0,
      store: true,
      choices: [
        'none',
        'website',
        'desktop app',
        'mobile app'
      ]
    }, {
      type: 'confirm',
      name: 'heroku',
      message: 'Use heroku',
      default: false,
      store: true
    }]);

    this.type = type;
    this.configure = {
      ...this.configure,
      ...configure
    };

    switch(type) {
      case 'website': {
        const configure: {
          server: boolean,
          graphql: boolean
        } = await this.prompt([{
          type: 'confirm',
          name: 'server',
          message: 'Use server',
          default: false,
          store: true
        }, {
          type: 'confirm',
          name: 'graphql',
          message: 'Use graphql',
          default: false,
          store: true
        }]);

        this.configure = {
          ...this.configure,
          ...configure,
          react: true
        };
        break;
      }

      case 'desktop app':
        this.configure = {
          ...this.configure,
          react: true
        };
        break;

      case 'mobile app':
      default:
        break;
    }
  }

  /**
   * Ask project information
  */
  async prompting() {
    await this.askDefaultInfo();
    await this.askAuthorInfo();
    await this.askConfigure();

    // store configure
    Object.keys(this.configure)
      .forEach(key => {
        if(key === 'promptValues')
          return;

        this.config.set(key, this.configure[key]);
      });

    // set default info and author info to package.json
    this.fs.writeJSON(
      this.destinationPath('package.json'), (
        this.fs.exists('package.json') ?
          this.pkg :
          this.state
      )
    );
  }

  /**
   * call other subgenerator
  */
  default() {
  }

  /**
   * Write default package.json
   * Becasue other subgenerator need to use package.json, this should be written in default
  */
  writePkg = () => {
    const authorName: string = (this.pkg.author || {}).name || 'author name';
    const projectName: string = this.pkg.name || 'project name';
    const repoName: string = `${authorName}/${projectName}`;

    this.fs.writeJSON(
      this.destinationPath('package.json'), {
        ...this.pkg,
        version: '0.1.0',
        main: './lib/index.js',
        scripts: {},
        homepage: `https://github.com/${repoName}/`,
        repository: {
          type: 'git',
          url: `get+https://github.com/${repoName}.git`
        },
        bugs: {
          url: `https://github.com/${repoName}/issues/`
        }
      }
    );
  }

  /**
   * write files
  */
  writing() {
    // write default pkg
    this.writePkg();

    // write scripts
    this.addScriptsToPkg({
      build: [
        'yarn babel'
      ].join(' && '),
      prod: [
        'yarn babel'
      ].join(' && '),
      watch: [
        'concurrently -c green',
        '"yarn lint:watch"',
        '"yarn babel:watch"'
      ].join(' '),
      ...(
        !this.configure.heroku ?
          {} : {
            'heroku-postbuild': 'yarn prod'
          }
      )
    });

    // copy files
    this.copyFiles({
      gitignore: '.gitignore'
    });
  }

  /**
   * Install packages.
  */
  install() {
    this.installPackages();
  }

  /**
   * The end of Generator.
  */
  end() {
    this.meow`Goodbye {green ${this.user.git.name()}}! Thank for using {red cat} project.`;
  }
};
