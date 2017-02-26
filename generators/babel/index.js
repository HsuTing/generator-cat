'use strict';

const Generator = require('yeoman-generator');
const _ = require('lodash');
const extend = _.merge;

const convertAlias = alias => {
  return Object.keys(alias)
    .map(key => {
      return {
        key: key,
        value: alias[key]
      };
    });
};

module.exports = class extends Generator {
  initializing() {
    this.props = {
      plugins: this.config.get('plugins') || []
    };
  }

  writing() {
    const relay = this.props.plugins.indexOf('relay') !== -1;
    // pkg
    const currentPkg = this.fs.readJSON(this.destinationPath('package.json'), {});
    const pkg = extend({
      scripts: {
        babel: (
          relay ?
          'export BABEL_ENV=async && rm -rf ./lib && babel src --out-dir lib' :
          'rm -rf ./lib && babel src --out-dir lib'
        ),
        'babel:watch': (
          relay ?
          'export BABEL_ENV=async && rm -rf ./lib && babel -w src --out-dir lib' :
          'rm -rf ./lib && babel -w src --out-dir lib'
        )
      }
    }, currentPkg);
    this.fs.writeJSON(this.destinationPath('package.json'), pkg);

    // files
    this.fs.copyTpl(
      this.templatePath('babelrc'),
      this.destinationPath('.babelrc'), {
        relay: relay,
        react: this.props.plugins.indexOf('react') !== -1,
        alias: convertAlias(extend(
          this.config.get('alias') || {}, {
            utils: 'utils'
          }
        ))
      }
    );
  }

  install() {
    const modules = [
      'babel-cli',
      'babel-core',
      'babel-plugin-transform-object-assign',
      'babel-plugin-module-resolver',
      'babel-preset-latest',
      'babel-preset-stage-0'
    ];

    if(this.props.plugins.indexOf('react') !== -1)
      modules.push(
        'babel-preset-react',
        'babel-plugin-transform-decorators-legacy'
      );

    if(this.props.plugins.indexOf('relay') !== -1)
      modules.push(
        'cat-graphql',
        'babel-relay-plugin',
        'babel-plugin-transform-runtime'
      );

    this.yarnInstall(modules, this.props.plugins.indexOf('heroku') !== -1 ? {} : {dev: true});
  }
};
