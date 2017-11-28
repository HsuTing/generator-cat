'use strict';

import {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString
} from 'graphql';
import {globalIdField} from 'graphql-relay';

import {nodeInterface} from 'schemas/fields';

export const dataFields = {
  data: {
    type: new GraphQLNonNull(GraphQLString),
    description: 'This is the data of the <%= name %>.'
  }
};

export default new GraphQLObjectType({
  name: '<%= name %>',
  description: 'This is the type of the <%= name %>.',
  interfaces: [nodeInterface],
  fields: {
    ...dataFields,
    id: globalIdField('<%= name %>')
  }
});
