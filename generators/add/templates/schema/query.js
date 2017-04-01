'use strict';

import {
  GraphQLNonNull,
  GraphQLString
} from 'graphql';

import {dataType} from './data';

export default {
  type: dataType,
  description: '<%= name %> query',
  args: {
    input: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  resolve: () => ({data: 'query'})
};
