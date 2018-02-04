// @flow
'use strict';

// TODO not test

import path from 'path';
import Generator from 'yeoman-generator';
import _ from 'lodash';
import parseAuthor from 'parse-author';

import meow from './meow';

type configureType = {
  isPrivate: boolean,
  react: boolean,
  server: boolean,
  graphql: boolean,
  heroku: boolean,
  npm: boolean
};

type pkgType = {
  name: string,
  description: string,
  keywords: Array<string>,
  author: {
    name: string,
    email: string,
    url: string
  },
  scripts: {}
};

type writeFileType = string | [
  string, {
    [string]: mixed
  }
];

/**
 * Base Generator for generator-cat.
 *
 * @param {String | Array} args - For Generator
 * @param {Object} options - For Generator
*/
export default class Base extends Generator {
  dependencies: Array<string> = []
  devDependencies: Array<string> = []

  configure: configureType = this.config.defaults({
    isPrivate: false,
    react: false,
    server: false,
    graphql: false,
    heroku: false,
    npm: false
  })

  /**
   * Use to get data from package.json
  */
  get pkg(): pkgType {
    const pkg: pkgType = this.fs.readJSON(this.destinationPath('package.json'), {});

    if(!pkg.author)
      pkg.author = {};
    else if(_.isString(pkg.author))
      pkg.author = parseAuthor(pkg.author);

    return pkg;
  }

  /**
   * String template of generator-cat
   *
   * @param {Array} messageArray - Array of String template
   * @return {string} - Output string
  */
  meow = (
    messageArray: Array<string>,
    ...otherMessage: Array<string>
  ): string => this.log(meow(messageArray, ...otherMessage))

  /**
   * Install packages
  */
  installPackages = () => {
    const {
      heroku
    }: configureType = this.configure;

    if(this.dependencies.length !== 0)
      this.yarnInstall(this.dependencies);

    if(this.devDependencies.length !== 0) {
      this.yarnInstall(this.devDependencies, {
        dev: !heroku
      });
    }
  }

  /**
   * Use to add scripts to package.json
   *
   * @param {Object} scripts - New sciprts of package.json
  */
  addScriptsToPkg = (
    scripts: {}
  ) => {
    const {
      ...pkg
    }: pkgType = this.pkg;
    pkg.scripts = {
      ...pkg.scripts,
      ...scripts
    };

    this.fs.writeJSON(
      this.destinationPath('package.json'),
      pkg
    );
  }

  /**
   * Rewrite the template path
   *
   * @param {string} templatePath - The template path
   * @return {string} - The root templates path
  */
  templatePath = (
    templatePath: string
  ) => path.resolve(__dirname, './../../templates', templatePath)

  /*
   * Copy the files
   *
   * @param {Object} files - The settings of the files
  */
  copyFiles = (
    files: {
      [string]: writeFileType
    }
  ) => {
    Object.keys(files)
      .forEach((
        templatePath: string
      ) => {
        const file: writeFileType = files[templatePath];

        if(file instanceof Array) {
          const [
            destinationPath,
            options
          ]: [
            string, {
              [string]: mixed
            }
          ] = file;

          this.fs.copyTpl(
            this.templatePath(templatePath),
            this.destinationPath(destinationPath),
            options
          );
          return;
        }

        this.fs.copy(
          this.templatePath(templatePath),
          this.destinationPath(file)
        );
      });
  }
}
