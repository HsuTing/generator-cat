'use strict';

import React from 'react';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';
import {Provider} from 'react-redux';

import store from 'stores/<%= name %>';

export default (
  <Provider store={store}>
    <Router history={browserHistory}>
    </Router>
  </Provider>
);
