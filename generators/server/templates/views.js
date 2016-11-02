'use strict';

import renderReact from 'middleware/react';

export default app => {
<% names.forEach(function(name) { -%>
  app.get('<%= name === "index" ? "/" : "/" + name + "/" %>', renderReact({
    router: false,
    redux: false,
    component: require('components<%= name[0].toUpperCase() + name.slice(1).toLowerCase() %>/<%= name[0].toUpperCase() + name.slice(1).toLowerCase() %>').default,
  }), (req, res) => {
    res.render('<%= name %>', {
      markup: req.react
    });
  });
<% }) -%>
};
