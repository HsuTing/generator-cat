'use strict';

const Generator = require('yeoman-generator');
const _ = require('lodash');
const extend = _.merge;

module.exports = class extends Generator {
  initializing() {
    this.props = {
      plugins: this.config.get('plugins') || []
    }

    this.config.set('alias', extend({
      routes: 'routes',
      middleware: 'middleware'
    }, this.config.get('alias') || {}));

    if(this.props.plugins.indexOf('graphql') !== -1)
      this.config.set('alias', extend({
        schemas: 'schemas'
      }, this.config.get('alias') || {}));
  }

  writing() {
    // pkg
    const currentPkg = this.fs.readJSON(this.destinationPath('package.json'), {});
    const pkg = extend({
      scripts: {
        'test-server': 'nodemon ./lib/server.js',
        start: 'NODE_ENV=production node ./lib/server.js'
      }
    }, currentPkg);
    this.fs.writeJSON(this.destinationPath('package.json'), pkg);

    // files
    this.fs.copyTpl(
      this.templatePath('server.js'),
      this.destinationPath('src/server.js'), {
        website: this.props.plugins.indexOf('react') !== -1,
        graphql: this.props.plugins.indexOf('graphql') !== -1,
        heroku: this.props.plugins.indexOf('heroku') !== -1
      }
    );

    this.fs.copyTpl(
      this.templatePath('router.js'),
      this.destinationPath('src/router.js'), {
        relay: this.props.plugins.indexOf('relay') !== -1,
        website: this.props.plugins.indexOf('react') !== -1
      }
    );

    if(this.props.plugins.indexOf('graphql') !== -1)
      this.fs.copy(
        this.templatePath('schema.js'),
        this.destinationPath('src/schemas/schema.js')
      );
  }

  install() {
    const modules = [
      'koa@next',
      'koa-helmet',
      'koa-compress@next',
      'koa-etag@next',
      'koa-body@2',
      'koa-better-router',
      'koa-morgan',
      'koa-mount@next',
      'nodemon'
    ];

    if(this.props.plugins.indexOf('react') !== -1)
      modules.push(
        'koa-static@next',
        'koa-html-minifier',
        'nunjucks',
        'cat-middleware'
      );

    if(this.props.plugins.indexOf('graphql') !== -1)
      modules.push(
        'graphql',
        'koa-convert',
        'koa-graphql'
      );

    if(this.props.plugins.indexOf('relay') !== -1)
      modules.push(
        'isomorphic-relay',
        'cat-middleware'
      );

    this.yarnInstall(modules);
  }
};
