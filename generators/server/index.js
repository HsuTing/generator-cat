'use strict';

const _ = require('lodash');
const extend = _.merge;

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

        case 'relay': return [
          'babel-polyfill',
          'react-relay'
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

  prompting() {
    return this.prompt([{
      type: 'confirm',
      name: 'db',
      message: 'Use the db',
      default: false,
      store: true,
      when: this.checkPlugins('graphql')
    }]).then(function(state) {
      this.state = extend(this.state, state);
    }.bind(this));
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
          name: 'index'
        });
      }
    }

    if(this.state.db)
      this.composeWith(require.resolve('./../db'));
  }

  writing() {
    this.writePkgScripts({
      'test-server': 'nodemon ./lib/server.js',
      start: 'NODE_ENV=production node ./lib/server.js'
    });

    this.writeFiles({
      'server.js': ['src/server.js', {
        react: this.checkPlugins('react')
      }]
    });

    if(this.checkPlugins('graphql')) {
      this.writeFiles({
        'graphql.js': 'src/routers/graphql.js',
        'schema.js': 'src/schemas/schema.js',
        'fields.js': 'src/schemas/fields.js'
      });
    }
  }

  install() {
    this.addInstall();
  }
};
