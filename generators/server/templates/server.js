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
<% for(customIndex in middleware) { -%>
<% if(middleware[customIndex].indexOf('custom') !== -1) { -%>
import <%= middleware[customIndex].replace('(custom)', '') %> from './middleware/<%= middleware[customIndex].replace('(custom)', '') %>';
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
app.use(cookieParser('<%= cookieIDs[index] -%>'));
<% } -%>
<% } -%>
<% if(middleware.indexOf('body parser') !== -1) { -%>
app.use(bodyParser.urlencoded({extended: false}));
<% } -%>
<% if(middleware.indexOf('connect multiparty') !== -1) { -%>
app.use(multipart());
<% } -%>
<% for(customIndex in middleware) { -%>
<% if(middleware[customIndex].indexOf('custom') !== -1) { -%>
app.use(<%= middleware[customIndex].replace('(custom)', '') %>);
<% } -%>
<% } -%>

['views', 'api'].forEach(folder => {
  try {
    fs.readdirSync(path.resolve(ROUTERS, folder)).forEach(filename => {
      const routes = require(path.resolve(ROUTERS, folder, filename)).default;

      if(typeof routes === 'function')
          routes(app);
    });
  } catch(e) {
    console.log(e);
  }
});
