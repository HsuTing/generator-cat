module.exports = {
<% if(router) { -%>
  routers: './routers',
<% } -%>
<% if(redux) { -%>
  actions: './actions',
  reducers: './reducers',
  stores: './stores',
<% } -%>
<% if(radium) { -%>
  componentsRadium: './components/radium',
<% } -%>
  components: './components'
};
