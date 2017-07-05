'use strict';

import {
  GraphQLNonNull,
  GraphQLString
} from 'graphql';

import dataType from './dataType';

export default {
  description: 'Get the data of the <%= name %>.',
  type: dataType,
  args: {
    input: {
      description: 'This is the args of the <%= name %>.',
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  resolve: () => ({data: 'query <%= name %>'})
};
