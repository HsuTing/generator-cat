'use strict';

import react from './../../middleware/react';

export default app => {
  app.use(react({
    router: <%= router %>,
    redux: <%= redux %>,
    radium: <%= radium %>,
<% if(redux) { -%>
    store: require('./../../stores/<%= name %>').default,
<% } -%>
<% if(router) { -%>
    component: require('./../../routers/<%= componentName %>').default
<% } else { -%>
    component: require('./../../components/<%= componentName %>').default
<% } -%>
  }));
};
