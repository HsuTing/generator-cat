'use strict';

import fs from 'fs';
import path from 'path';
import express from 'express';
import compression from 'compression';
<% if(middleware.indexOf('cookie parser') !== -1) { -%>
import cookieParser from 'cookie-parser';
<% } -%>
<% if(middleware.indexOf('body parser') !== -1) { -%>
import bodyParser from 'body-parser';
<% } -%>
<% if(middleware.indexOf('connect multiparty') !== -1) { -%>
import multipart from 'connect-multiparty';
<% } -%>
<% for(customInde in middleware) { -%>
<% if(middleware[customInde].indexOf('custom') !== -1) { -%>
import <%= middleware[customInde].replace('(custom)', '') %> from './middleware/<%= middleware[customInde].replace('(custom)', '') %>';
<% } -%>
<% } -%>

const ENV = Boolean(Number(process.env.NODE_ENV) || 0);
const BASE_DIR = path.resolve(__dirname, './../');
const ROUTERS = path.resolve(__dirname, './server-routes');
const app = express();

app.set('views', path.resolve(BASE_DIR, 'views'));
app.set('view engine', 'pug');

app.use('/static', express.static(
  path.resolve(BASE_DIR, './public')
));

app.use(compression());
<% if(middleware.indexOf('cookie parser') !== -1) { -%>
<% for(index in cookieIDs) { -%>
app.use(cookieParser(<%= cookieIDs[index] -%>));
<% } -%>
<% } -%>
<% if(middleware.indexOf('body parser') !== -1) { -%>
app.use(bodyParser.urlencoded({extended: false}));
<% } -%>
<% if(middleware.indexOf('connect multiparty') !== -1) { -%>
app.use(multipart());
<% } -%>
<% for(customInde in middleware) { -%>
<% if(middleware[customInde].indexOf('custom') !== -1) { -%>
app.use(<%= middleware[customInde].replace('(custom)', '') %>);
<% } -%>
<% } -%>

['views', 'api'].foreEach(folder => {
  fs.readdirSync(path.resolve(ROUTERS, folder)).forEach(files => {
    const routes = require(files).default;
    if(typeof routes === 'function')
      routes(app);
  });
});

app.listen(ENV ? 80 : 8000);
