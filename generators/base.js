'use strict';

const Generator = require('yeoman-generator');
const parseAuthor = require('parse-author');
const _ = require('lodash');
const extend = _.merge;

/* istanbul ignore next */
module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.props = {
      dependencies: [],
      devDependencies: []
    }
  }

  addInstall(dev) {
    const {dependencies, devDependencies} = this.props;

    if(dependencies.length !== 0)
      this.yarnInstall(dependencies);

    if(devDependencies.length !== 0)
      this.yarnInstall(devDependencies, {
        dev: dev || !this.checkPlugins('heroku')
      });
  }

  addDependencies(dependencies = [], addFunc = () => {}) {
    this.getPlugins.forEach(plugin => {
      (addFunc(plugin) || []).forEach(newDependencies => {
        dependencies.push(newDependencies);
      });
    });
    this.props.dependencies = dependencies;
  }

  addDevDependencies(devDependencies = [], addFunc = () => {}) {
    this.getPlugins.forEach(plugin => {
      (addFunc(plugin) || []).forEach(newDevDependencies => {
        devDependencies.push(newDevDependencies);
      });
    });
    this.props.devDependencies = devDependencies;
  }

  checkPlugins(name) {
    return this.getPlugins.includes(name);
  }

  addAlias(alias) {
    const newAlias = extend(
      this.getAlias,
      alias
    );
    this.config.set('alias', newAlias);
  }

  get getPlugins() {
    return this.config.get('plugins') || [];
  }

  get getAlias() {
    return this.config.get('alias') || {};
  }

  get getPkg() {
    return this.fs.readJSON(this.destinationPath('package.json'), {});
  }

  get getAuthor() {
    const pkg = this.getPkg;

    if(_.isString(pkg.author)) {
      const author = parseAuthor(pkg.author);

      return {
        name: author.name,
        email: author.email,
        url: author.url
      };
    }

    return pkg.author || {};
  }

  writePkgScripts(scripts) {
    const currentPkg = this.fs.readJSON(this.destinationPath('package.json'), {});
    const pkg = extend({
      scripts
    }, currentPkg);

    this.fs.writeJSON(this.destinationPath('package.json'), pkg);
  }

  writeFiles(files) {
    Object.keys(files).forEach(templatePath => {
      const file = files[templatePath];
      const destinationPath = file instanceof Array ? file[0] : file;
      const options = file instanceof Array ? file[1] : {};

      this.fs.copyTpl(
        this.templatePath(templatePath),
        this.destinationPath(destinationPath),
        options
      );
    });
  }
}
