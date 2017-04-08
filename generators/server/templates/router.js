'use strict';

<% if(desktop_app) { -%>
import path from 'path';
<% } -%>
<% if(website) { -%>
import process from 'process';
<% if(relay) { -%>
import Relay from 'react-relay';
<% } -%>
<% } -%>
import body from 'koa-body';
import Router from 'koa-better-router';
<% if(website) { -%>
<% if(relay) { -%>
import relay from 'cat-middleware/lib/koa-relay';

import index from 'containers/index';
<% } else { -%>
import react from 'cat-middleware/lib/koa-react';

import Index from 'components/Index';
<% } -%>
<% } -%>

const router = Router().loadMethods();
<% if(website) { -%>
const ENV = process.env.NODE_ENV === 'production';
<% if(relay) { -%>
const graphqlLink = ENV ? `http://localhost:${process.env.PORT}/graphql` : 'http://localhost:8000/graphql';
<% } -%>
<% } -%>

<% if(website) { -%>
<% if(relay) { -%>
router.get('/', body(), relay({
<% if(desktop_app) { -%>
  root: path.resolve(__dirname, './../views'),
<% } -%>
  rootContainerProps: index({input: 'index'}),
  networkLayer: new Relay.DefaultNetworkLayer(graphqlLink),
  js: 'index',
  ENV
}));
<% } else { -%>
router.get('/', body(), react({
<% if(desktop_app) { -%>
  root: path.resolve(__dirname, './../views'),
<% } -%>
  component: Index,
  js: 'index',
  ENV,
}));
<% } -%>
<% } else { -%>
router.get('/', body(), ctx => {
  ctx.body = 'Hello World';
});
<% } -%>

export default router;
