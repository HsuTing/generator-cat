'use strict';

import {
  GraphQLString,
  GraphQLObjectType
} from 'graphql';
import {getFields} from 'cat-utils/lib/graphql-utils';

export const dataType = new GraphQLObjectType({
  name: 'data',
  fields: () => getFields({
    clientMutationId: 'mutation id'
    data: 'data'
  })
});
