'use strict';

<% if(router) { -%>
import React from 'react';
<% } -%>
import Relay from 'react-relay';
<% if(router) { -%>
import {BrowserRouter, StaticRouter, Route} from 'react-router-dom';
<% } -%>

import <%= name %> from 'components/<%= name %>';

<% if(router) { -%>
const routes = (isServer, props) => {
  const Router = isServer ? StaticRouter : BrowserRouter;

  class <%= name %>Router extends React.Component {
    render() {
      return (
        <Router {...props}>
          <div>
            <Route exact path='/' component={<%= name %>}/>
          </div>
        </Router>
      );
    }
  }

  return <%= name %>Router;
};
<% } -%>

<% if(router) { -%>
const Container = (isServer, props) => Relay.createContainer(routes(isServer, props), {
<% } else { -%>
const Container = Relay.createContainer(<%= name %>, {
<% } -%>
  fragments: {
    <%= name.toLowerCase() %>: () => Relay.QL`
      fragment on data {
        data
      }
    `
  }
});

class <%= name %>Route extends Relay.Route {
  static routeName = '<%= name %>Route';

  static paramDefinitions = {
    input: {required: true}
  };

  static queries = {
    <%= name.toLowerCase() %>: Component => Relay.QL`
      query <%= name.toLowerCase() %>Data {
        <%= name.toLowerCase() %>Query (input: $input) {
          ${Component.getFragment('index')}
        }
      }
    `
  };
}

<% if(router) { -%>
export default query => {
  const {isServer, props, ...<%= name.toLowerCase() %>RouteQuery} = query;

  return {
    Container: Container(isServer, props),
    queryConfig: new <%= name %>Route(<%= name.toLowerCase() %>RouteQuery)
  };
};
<% } else { -%>
export default query => ({
  Container,
  queryConfig: new <%= name %>Route(query || {})
});
<% } -%>
