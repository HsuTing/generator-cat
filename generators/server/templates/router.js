'use strict';

<% if(react) { -%>
import process from 'process';
<% } -%>
import Router from 'koa-better-router';
<% if(react) { -%>
import React from 'react';
import reactRender from 'cat-middleware/lib/koa-react-render';

import Index from 'components/Index';
<% } -%>

const router = Router().loadMethods();
<% if(react) { -%>
const ENV = process.env.NODE_ENV === 'production';
<% } -%>

<% if(react) { -%>
router.get('/', reactRender(<Index />, {
  js: 'index'
  ENV,
}));
<% } else { -%>
router.get('/', ctx => {
  ctx.body = 'Hello World';
});
<% } -%>

export default router;
