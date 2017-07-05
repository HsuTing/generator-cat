'use strict';

import React from 'react';
import {
  QueryRenderer,
  graphql,
} from 'react-relay';

import environment from 'utils/environment';

/* eslint-disable react/display-name */
export default () => (
  <QueryRenderer environment={environment}
    query={graphql`
      query <%= componentName %>ContainerQuery($input: String!) {
        <%= queryName %>(input: $input) {
          data
        }
      }
    `}
    variables={{
      input: 'test'
    }}
    render={({error, props}) => {
      if(error)
        return <div>{error.message}</div>;
      else if(props)
        return <div>{JSON.stringify(props)}</div>;
      return <div>Loading</div>;
    }}
  />
);
/* eslint-enable react/display-name */
