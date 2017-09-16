'use strict';

<% if(relay) { -%>
import 'babel-polyfill';
<% } -%>
<% if(react) { -%>
import process from 'process';
<% } -%>
import koaRouter from 'koa-better-router';
<% if(react) { -%>
import React from 'react';
import reactRender from 'cat-middleware/lib/koa-react-render';
<% if(relay) { -%>
import relayQueryLookupRender from 'cat-middleware/lib/koa-relay-query-lookup-render';
<% } -%>

import <%= componentName %> from 'components/<%= componentName %>';
<% } -%>
<% if(relay) { -%>
import environment from 'utils/environment';
import <%= name %>Query, {variables as <%= name %>Variables} from 'constants/query/<%= name %>Query';
<% } -%>

<% if(react) { -%>
const ENV = process.env.NODE_ENV === 'production';
<% } -%>
<% if(name.toLowerCase() === 'index') { -%>
const router = koaRouter().loadMethods();
<% } else { -%>
const router = koaRouter({prefix: '/<%= name %>'}).loadMethods();
<% } -%>

<% if(relay) { -%>
router.get('/',
  relayQueryLookupRender(environment, <%= name %>Query, <%= name %>Variables),
  ((ctx, next) => reactRender(
    <<%= componentName %> />, {
      js: 'index',
      records: ctx.records,
      ENV
    }
  )(ctx, next))
);
<% } else if(react) { -%>
router.get('/', reactRender(<<%= componentName %> />, {
  js: '<%= name %>',
  ENV
}));
<% } else { -%>
router.get('/', ctx => {
  ctx.body = 'Hello World';
});
<% } -%>

export default router;
