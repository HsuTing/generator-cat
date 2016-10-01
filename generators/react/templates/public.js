'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
<% if(redux && !router) { -%>
import {Provider} from 'react-redux';
import store from './../store/<%= name %>';
<% } -%>
<% if(radium) { -%>
import Wrapper from './../components/radium/Wrapper';
<% } -%>
<% if(router) { -%>
import router from './../routers/<%= name %>';
<% } else { -%>
import <%= componentName %> from './../components/<%= componentName %>';
<% } -%>

(() => {
  ReactDOM.render(
<% if(radium) { -%>
    <Wrapper>
<% if(router) { -%>
      {router}
<% } else if(redux) { -%>
      <Provider store={store}>
        <<%= componentName %> />
      </Provider>
<% } else { -%>
      <<%= componentName %> />
<% } -%>
    </Wrapper>,
    document.getElementById('root')
<% } else { -%>
<% if(router) { -%>
    {router},
<% } else if(redux) { -%>
    <Provider store={store}>
      <<%= componentName %> />
    </Provider>,
<% } else { -%>
    <<%= componentName %> />,
<% } -%>
    document.getElementById('root')
<% } -%>
  );
})();
