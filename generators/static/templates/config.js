module.exports = [
  {
    router: <%= router %>,
    redux: <%= redux %>,
    radium: <%= radium %>,
<% if(router) { -%>
    location: <%= hostname %>,
    component: require('./lib/routers/<%= name %>').default,
<% } else { -%>
    component: require('./lib/components/<%= name %>/<%= componentName %>').default,
<% } -%>
<% if(redux) { -%>
    store: require('./lib/stores/<%= name %>').default,
<% } -%>
    name: 'index'
  }
];
