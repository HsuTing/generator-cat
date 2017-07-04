'use strict';

import {
  GraphQLSchema,
  GraphQLObjectType
} from 'graphql';

import * as index from './index';

// TODO modify
export default new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    description: 'all queries',
    fields: () => ({
      indexQuery: index.query
    })
  }),
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    description: 'all mutations',
    fields: () => ({
      indexMutation: index.mutation
    })
  })
});
