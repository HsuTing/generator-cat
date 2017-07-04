'use strict';

import fs from 'fs';
import process from 'process';
import path from 'path';
import zlib from 'zlib';
import path from 'path';
import Koa from 'koa';
import morgan from 'koa-morgan';
import helmet from 'koa-helmet';
import compress from 'koa-compress';
import etag from 'koa-etag';
import mount from 'koa-mount';
import body from 'koa-body';
<% if(react) { -%>
import serve from 'koa-static';
import minify from 'koa-html-minifier';
<% } -%>
<% if(graphql) { -%>
import convert from 'koa-convert';
import graphql from 'koa-graphql';

import schema from 'schemas/schema';
<% } -%>

const app = new Koa();
const root = path.resolve(__dirname, './../');
const ENV = process.env.NODE_ENV === 'production';

// middleware
if(ENV)
  app.use(morgan('combined', {
    stream: fs.createWriteStream(
      path.resolve(root, 'server.log'), {
        flags: 'a'
      }
    )
  }));
else
  app.use(morgan('dev'));
app.use(helmet());
app.use(etag());
app.use(body());
app.use(compress({
  threshold: 2048,
  flush: zlib.Z_SYNC_FLUSH
}));
<% if(react) { -%>

app.use(mount('/public', serve(
  path.resolve(root, 'public')
)));
if(ENV)
  app.use(minify({
    removeComments: true,
    collapseWhitespace: true,
    minifyCSS: true,
    minifyURLs: true,
    minifyJS: true
  }));
<% } -%>
<% if(graphql) { -%>

app.use(mount('/graphql', convert(graphql({
  schema,
  graphiql: !ENV,
  pretty: !ENV,
  formatError: error => {
    console.log(error);
    if(!ENV)
      return error;
  }
}))));
<% } -%>

// add router
fs.readdirSync(path.resolve(__dirname, './routers'))
  .forEach(router => {
    app.use(
      require(
        `routers/${router.replace('.js')}`
      ).default.middleware()
    );
  });

// setting
app.listen(ENV ? process.env.PORT : 8000, () => {
  console.log('server start');
});
