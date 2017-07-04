'use strict';

<% if(react) { -%>
import process from 'process';
<% } -%>
import Router from 'koa-better-router';
<% if(react) { -%>
import React from 'react';
import reactRender from 'cat-middleware/lib/koa-react-render';

import <%= componentName %> from 'components/<%= componentName %>';
<% } -%>

<% if(react) { -%>
const ENV = process.env.NODE_ENV === 'production';
<% } -%>
<% if(name.toLowerCase() === 'index') { -%>
const router = Router().loadMethods();
<% } else { -%>
const router = Router({prefix: '/<%= name %>'}).loadMethods();
<% } -%>

<% if(react) { -%>
router.get('/', reactRender(<<%= componentName %> />, {
  js: '<%= name %>'
  ENV,
}));
<% } else { -%>
router.get('/', ctx => {
  ctx.body = 'Hello World';
});
<% } -%>

export default router;
