'use strict';

import {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInputObjectType
} from 'graphql';

const dataType = new GraphQLObjectType({
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

const inputType = new GraphQLInputObjectType({
  name: 'input',
  fields: () => ({
    clientMutationId: {
      type: GraphQLString
    },
    data: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'input data'
    }
  })
});

export const query = {
  type: dataType,
  description: '<%= name %> query',
  args: {
    input: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  resolve: () => ({data: 'query'})
};

export const mutation = {
  type: dataType,
  description: '<%= name %> mutation',
  args: {
    input: {
      type: new GraphQLNonNull(inputType)
    }
  },
  resolve: () => ({data: 'mutation'})
};
