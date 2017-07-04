'use strict';

const Generator = require('yeoman-generator');
const parseAuthor = require('parse-author');
const _ = require('lodash');
const extend = _.merge;

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.props = {
      plugins: this.config.get('plugins') || [],
      alias: this.config.get('alias') || {},
      pkg: this.fs.readJSON(this.destinationPath('package.json'), {}),
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
    this.props.plugins.forEach(plugin => {
      (addFunc(plugin) || []).forEach(newDependencies => {
        dependencies.push(newDependencies);
      });
    });
    this.props.dependencies = dependencies;
  }

  addDevDependencies(devDependencies = [], addFunc = () => {}) {
    this.props.plugins.forEach(plugin => {
      (addFunc(plugin) || []).forEach(newDevDependencies => {
        devDependencies.push(newDevDependencies);
      });
    });
    this.props.devDependencies = devDependencies;
  }

  checkPlugins(name) {
    return this.props.plugins.includes(name);
  }

  addAlias(alias) {
    this.props.alias = extend(
      this.props.alias,
      alias
    );
    this.config.set('alias', this.props.alias);
  }

  get getAlias() {
    return this.props.alias;
  }

  get getPkg() {
    return this.props.pkg;
  }

  get getAuthor() {
    const {pkg} = this.props;

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
