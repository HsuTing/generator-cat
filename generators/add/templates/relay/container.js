'use strict';

<% if(router) { -%>
import React from 'react';
import radium from 'radium';
<% } -%>
import Relay from 'react-relay';
<% if(router) { -%>
import {BrowserRouter, StaticRouter, Route} from 'react-router-dom';
<% } -%>

import <%= name %> from 'components/<%= name %>';

<% if(router) { -%>
const routes = options => {
  const {isServer, props} = options;
  const Router = isServer ? StaticRouter : BrowserRouter;

  @radium
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
const container = options => Relay.createContainer(routes(options), {
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
    Container: container({isServer, props}),
    queryConfig: new <%= name %>Route(<%= name.toLowerCase() %>RouteQuery)
  };
};
<% } else { -%>
export default query => ({
  Container,
  queryConfig: new <%= name %>Route(query || {})
});
<% } -%>
