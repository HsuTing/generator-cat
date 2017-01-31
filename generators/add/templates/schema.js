'use strict';

import {
  GraphQLNonNull,
  GraphQLString
} from 'graphql';

export const query = {
  type: GraphQLString,
  description: '<%= name %> query',
  resolve: () => 'query'
};

export const mutation = {
  type: GraphQLString,
  description: '<%= name %> mutation',
  args: {
    input: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  resolve: () => 'mutation'
};
