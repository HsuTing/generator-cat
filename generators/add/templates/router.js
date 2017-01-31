'use strict';

import React from 'react';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';
<% if(redux) { -%>
import {Provider} from 'react-redux';
import store from 'stores/<%= name %>';
<% } -%>

<% if(redux) { -%>
export default (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/' component={Root}>
        <IndexRoute component={Index} />
        <Route path='*' component={Index} />
      </Route>
    </Router>
  </Provider>
);
<% } else { -%>
export default (
  <Router history={browserHistory}>
    <Route path='/' component={Root}>
      <IndexRoute component={Index} />
      <Route path='*' component={Index} />
    </Route>
  </Router>
);
<% } -%>
