module.exports = [
  {
  router: <%= router %>,
  redux: <%= redux %>,
  radium: <%= radium %>,
<% if(router) { -%>
    component: require('./lib/routers/<%= componentName %>').default,
<% } else { -%>
    component: require('./lib/components/<%= componentName %>').default,
<% } -%>
<% if(redux) { -%>
    store: require('./lib/stores/<%= name %>').default,
<% } -%>
    name: 'index'
  }
];
