'use strict';

import React from 'react';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';
<% if(redux) { -%>
import {Provider} from 'react-redux';
import store from './../store/<%= name %>';
<% } -%>
import <%= componentName %> from './../components/<%= componentName %>';

export default (
<% if(redux) { -%>
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={<%= componentName %>} />
    </Router>
  </Provider>
<% } else { -%>
  <Router history={browserHistory}>
    <Route path="/" component={<%= componentName %>} />
  </Router>
<% } -%>
);
