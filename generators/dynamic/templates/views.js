'use strict';

import react from './../../middleware/react';

const ENV = Boolean(Number(process.env.NODE_ENV) || 0);

export default app => {
  app.use(react({
    router: <%= router %>,
    redux: <%= redux %>,
    radium: <%= radium %>,
<% if(redux) { -%>
    store: require('./../../stores/<%= name %>').default,
<% } -%>
<% if(router) { -%>
    component: require('./../../routers/<%= name %>').default
<% } else { -%>
    component: require('./../../components/<%= componentName %>').default
<% } -%>
  }), (req, res) => {
    res.render('page', {
      markup: req.react
    });
  });
};
