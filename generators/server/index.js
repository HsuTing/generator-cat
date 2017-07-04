'use strict';

const Base = require('./../base');

module.exports = class extends Base {
  initializing() {
    if(this.checkPlugins('graphql'))
      this.addAlias({
        schemas: 'schemas'
      });

    this.addDependencies([
      'koa',
      'koa-helmet',
      'koa-compress',
      'koa-etag',
      'koa-body',
      'koa-better-router',
      'koa-morgan',
      'koa-mount',
      'nodemon'
    ], plugin => {
      switch(plugin) {
        case 'react': return [
          'koa-static',
          'koa-html-minifier',
          'nunjucks',
          'cat-middleware',
          'react',
          'react-dom'
        ];

        case 'graphql': return [
          'graphql',
          'koa-convert',
          'koa-graphql'
        ];
      }
    })
  }

  writing() {
    this.writePkgScripts({
      'test-server': 'nodemon ./lib/server.js',
      start: 'NODE_ENV=production node ./lib/server.js'
    });

    this.writeFiles({
      'server.js': ['src/server.js', {
        react: this.checkPlugins('react'),
        graphql: this.checkPlugins('graphql')
      }]
    });

    if(this.checkPlugins('graphql'))
      this.writeFiles({
        'schema.js': 'src/schemas/schema.js'
      });
  }

  install() {
    this.addInstall();
  }
};
