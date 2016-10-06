'use strict';

import react from './../../middleware/react';
<% if(router) { -%>
import <%= name %> from './../../routers/<%= name %>';
<% } else {-%>
import <%= componentName %> from './../../components/<%= componentName %>';
<% } -%>
<% if(redux) { -%>
  import store from './../../stores/<%= name %>';
<% } -%>

const ENV = Boolean(Number(process.env.NODE_ENV) || 0);

export default app => {
  app.use(react({
    component: <%= router ? name : componentName %>,
<% if(redux) { -%>
    store: store,
<% } -%>
    type: <%= (router ? 'router' : 'normal') %>
  }));

  app.use((req, res) => {
    res.render(ENV ? 'page' : 'test-page', {
      markup: req.react
    });
  });
};
