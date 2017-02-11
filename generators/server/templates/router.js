'use strict';

<% if(website) { -%>
import process from 'process';
<% if(graphql) { -%>
import Relay from 'react-relay';
<% } -%>
<% } -%>
import body from 'koa-body';
import Router from 'koa-better-router';
<% if(website) { -%>
<% if(graphql) { -%>
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
<% if(graphql) { -%>
const graphqlLink = ENV ? 'http://localhost/graphql' : 'http://localhost:8000/graphql';
<% } -%>
<% } -%>

<% if(website) { -%>
<% if(graphql) { -%>
router.get('/', body(), relay({
  rootContainerProps: index({input: 'index'}),
  networkLayer: new Relay.DefaultNetworkLayer(graphqlLink),
  js: 'index',
  ENV
}));
<% } else { -%>
router.get('/', body(), react({
  component: Index,
  js: 'index',
  ENV
}));
<% } -%>
<% } else { -%>
router.get('/', body(), ctx => {
  ctx.body = 'Hello World';
});
<% } -%>

export default router;
