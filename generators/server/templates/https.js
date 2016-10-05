'use strict';

import http from 'http';
import https from 'https';
import express from 'express';
import letsencrypt from 'letsencrypt-express';
import leChallengeFs from 'le-challenge-fs';
import leStoreCertbot from 'le-store-certbot';
import redirectHttps from 'redirect-https';
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
const lex = letsencrypt.create({
  server: 'https://acme-v01.api.letsencrypt.org/directory',

  challenges: {'http-01': leChallengeFs.create({webrootpath: '/tmp/acme-challenges'})},
  stroe: leStoreCertbot.create({webrootpath: '/tmp/acme-challenges'}),

  approveDomains: (opts, certs, callback) => {
    if(certs)
      opts.domains = certs.altnames;
    else {
      opts.domains = ['<%= domain %>'];
      opts.email = '<%= email %>';
      opts.agreeTos = true;
    }

    callback(null, {options: opts, certs: certs});
  }
});

http.createServer(lex.middleware(redirectHttps())).listen(80);

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

https.createServer(lex.httpsOptions, lex.middleware(app)).listen(ENV ? 443 : 8000);
