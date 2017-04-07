'use strict';

import Relay from 'react-relay';

import <%= name %> from 'components/<%= name %>';

const Container = Relay.createContainer(<%= name %>, {
  fragments: {
    <%= name.toLowerCase() %>: () => Relay.QL`
      fragment on data {
        data
      }
    `
  }
});

class Route extends Relay.Route {
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

export default query => ({
  Container,
  queryConfig: new Route(query || {})
});
