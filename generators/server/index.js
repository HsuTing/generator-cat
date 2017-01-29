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
        schema: 'schema'
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
        website: this.props.plugins.indexOf('react') !== -1
      }
    );

    this.fs.copyTpl(
      this.templatePath('router.js'),
      this.destinationPath('src/router.js'), {
        website: this.props.plugins.indexOf('react') !== -1,
        graphql: this.props.plugins.indexOf('graphql') !== -1
      }
    );

    if(this.props.plugins.indexOf('react') !== -1)
      this.fs.copy(
        this.templatePath('middleware/react.js'),
        this.destinationPath('src/middleware/react.js')
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
      'nodemon'
    ];

    if(this.props.plugins.indexOf('react') !== -1)
      modules.push(
        'koa-mount@next',
        'koa-static@next',
        'koa-views@next',
        'koa-html-minifier',
        'nunjucks'
      );

    if(this.props.plugins.indexOf('graphql') !== -1)
      modules.push(
        'koa-convert',
        'koa-graphql'
      );

    this.yarnInstall(modules, {dev: true});
  }
};
