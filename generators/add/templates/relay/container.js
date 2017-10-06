'use strict';

import React from 'react';
import {QueryRenderer} from 'react-relay';

import environment from 'utils/environment';
import <%= queryName %>Query, {variables as <%= queryName %>Variables} from 'constants/query/<%= queryName %>Query';

/* eslint-disable react/display-name */
export default () => (
  <QueryRenderer environment={environment}
    query={<%= queryName %>Query}
    variables={<%= queryName %>Variables}
    render={({error, props}) => {
      /* istanbul ignore next */
      if(error)
        return <div>{error.message}</div>;
      else if(props)
        return <div>{JSON.stringify(props)}</div>;
      /* istanbul ignore next */
      return <div>Loading</div>;
    }}
  />
);
/* eslint-enable react/display-name */
