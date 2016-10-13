'use strict';

import http from 'http';
import https from 'https';
import letsencrypt from 'letsencrypt-express';
import leChallengeFs from 'le-challenge-fs';
import leStoreCertbot from 'le-store-certbot';
import redirectHttps from 'redirect-https';
<% include server.js -%>

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
https.createServer(lex.httpsOptions, lex.middleware(app)).listen(process.env.PORT || (ENV ? 443 : 8000));
