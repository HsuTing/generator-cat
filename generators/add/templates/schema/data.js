'use strict';

import {
  GraphQLString,
  GraphQLObjectType
} from 'graphql';

export const dataType = new GraphQLObjectType({
  name: 'data',
  fields: () => ({
    clientMutationId: {
      type: GraphQLString
    },
    data: {
      type: GraphQLString,
      description: 'data',
      resolve: root => root.data || ''
    }
  })
});
