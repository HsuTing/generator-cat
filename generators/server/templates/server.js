'use strict';

import fs from 'fs';
import process from 'process';
import path from 'path';
import zlib from 'zlib';
import Koa from 'koa';
import morgan from 'koa-morgan';
import helmet from 'koa-helmet';
import compress from 'koa-compress';
import etag from 'koa-etag';
import body from 'koa-body';
<% if(react) { -%>
import mount from 'koa-mount';
<% } -%>
<% if(react) { -%>
import serve from 'koa-static';
import minify from 'koa-html-minifier';
<% } -%>

const app = new Koa();
const root = path.resolve(__dirname, './../');
const ENV = process.env.NODE_ENV === 'production';

// middleware
/* istanbul ignore next */
if(ENV) {
  app.use(morgan('combined', {
    stream: fs.createWriteStream(
      path.resolve(root, 'server.log'), {
        flags: 'a'
      }
    )
  }));
} else if(process.env.NODE_ENV !== 'test')
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
/* istanbul ignore if */
if(ENV) {
  app.use(minify({
    removeComments: true,
    collapseWhitespace: true,
    minifyCSS: true,
    minifyURLs: true,
    minifyJS: true
  }));
}
<% } -%>

// add router
fs.readdirSync(path.resolve(__dirname, './routers'))
  .forEach(router => {
    const routerPath = `./routers/${router.replace('.js', '')}`;
    app.use(
      (require(routerPath).default || /* istanbul ignore next */ require(routerPath)).middleware()
    );
  });

// setting
export default app.listen(/* istanbul ignore next */ ENV ? process.env.PORT : 8000);
