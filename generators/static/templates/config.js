module.exports = [
<% names.forEach(function(name, index) { -%>
  {
    pug: './views/<%= name %>.pug',
    router: false,
    redux: false,
    component: require('./lib/components/<%= name %>/<%= name[0].toUpperCase() + name.slice(1).toLowerCase() %>').default,
    name: '<%= name %>'
  }<% if(index !== names.length - 1) { %>,<% } %>
<% }) -%>
];
