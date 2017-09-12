'use strict';

const Base = require('./../base');

module.exports = class extends Base {
  initializing() {
    const alias = {
      routers: 'routers'
    };

    if(this.checkPlugins('graphql'))
      alias.schemas = 'schemas';

    this.state = {};
    this.addAlias(alias);
    this.addDependencies([
      'koa',
      'koa-helmet',
      'koa-compress',
      'koa-etag',
      'koa-body',
      'koa-better-router',
      'koa-morgan',
      'nodemon'
    ], plugin => {
      switch(plugin) {
        case 'react': return [
          'koa-static',
          'koa-html-minifier',
          'koa-mount',
          'nunjucks',
          'cat-middleware',
          'react',
          'react-dom'
        ];

        case 'graphql': return [
          'koa-mount',
          'koa-graphql',
          'graphql',
          'graphql-relay'
        ];
      }
    });
  }

  default() {
    /* istanbul ignore next */
    if(!this.config.get('cat')) {
      this.composeWith(require.resolve('./../add'), {
        item: 'router',
        name: 'index'
      });

      if(this.checkPlugins('graphql')) {
        this.composeWith(require.resolve('./../add'), {
          item: 'schema',
          name: 'data'
        });
      }
    }
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

    if(this.checkPlugins('graphql')) {
      this.writeFiles({
        'schema.js': 'src/schemas/schema.js',
        'fields.js': 'src/schemas/fields.js'
      });
    }
  }

  install() {
    this.addInstall();
  }
};
