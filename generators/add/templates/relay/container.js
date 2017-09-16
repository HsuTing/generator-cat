'use strict';

import React from 'react';
import QueryLookupRenderer from 'relay-query-lookup-renderer';

import environment from 'utils/environment';
import <%= queryName %>Query, {variables as <%= queryName %>Variables} from 'constants/query/<%= queryName %>Query';

/* eslint-disable react/display-name */
export default () => (
  <QueryLookupRenderer lookup
    environment={environment}
    query={<%= queryName %>Query}
    variables={<%= queryName %>Variables}
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
