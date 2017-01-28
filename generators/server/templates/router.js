'use strict';

import process from 'process';
import body from 'koa-body';
import Router from 'koa-better-router';

<% if(website) { -%>
import React from 'middleware/react';
import Index from 'components/Index';
<% } -%>

const router = Router().loadMethods();

<% if(website) { -%>
router.get('/', body(), React({
  component: Index
}), ctx => {
  return ctx.render('template.html', {
    js: 'index',
    content: ctx.react,
    ENV: process.env.NODE_ENV === 'production'
  });
});
<% } else { -%>
router.get('/', body(), ctx => {
  ctx.body = 'Hello World';
});
<% } -%>

export default router;
