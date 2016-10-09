module.exports = [
  {
<% if(router) { -%>
    router: true,
<% } -%>
<% if(redux) { -%>
    redux: true,
<% } -%>
<% if(radium) { -%>
    radium: true,
<% } -%>
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
