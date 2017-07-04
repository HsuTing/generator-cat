'use strict';

import {
  GraphQLNonNull,
  GraphQLString,
  GraphQLInputObjectType
} from 'graphql';

import {dataType} from './data';

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

export default {
  type: dataType,
  description: '<%= name %> mutation',
  args: {
    input: {
      type: new GraphQLNonNull(inputType)
    }
  },
  resolve: () => ({data: 'mutation'})
};
