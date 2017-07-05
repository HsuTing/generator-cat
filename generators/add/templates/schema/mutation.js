'use strict';

import {
  GraphQLNonNull,
  GraphQLString
} from 'graphql';
import {mutationWithClientMutationId} from 'graphql-relay';

import dataType from './dataType';

export default mutationWithClientMutationId({
  name: '<%= name %>',
  description: 'Modify the data of the <%= name %>.',
  inputFields: {
    data: {
      description: 'This is the args of the <%= name %>.',
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  outputFields: {
    newData: {
      description: 'This is output data of the <%= name %> after modifying the <%= name %>.',
      type: dataType
    }
  },
  mutateAndGetPayload: (data, ctx) => ({
    newData: {
      data: 'mutation <%= name %>'
    }
  })
});
