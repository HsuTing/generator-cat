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

const app = express();
const BASE_DIR = path.resolve(__dirname, './../');
const ROUTERS = path.join(__dirname, './server-routers');

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

fs.readdirSync(ROUTERS).forEach(file => {
  require('./server-routers/' + file).default(app);
});

app.listen(8000);
