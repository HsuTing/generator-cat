'use strict';

import {
  GraphQLObjectType,
  GraphQLString
} from 'graphql';
import {globalIdField} from 'graphql-relay';

import fields from 'schemas/fields';

const {nodeInterface} = fields;

export default new GraphQLObjectType({
  name: '<%= name %>',
  description: 'This is the type of the <%= name %>.',
  interfaces: [nodeInterface],
  fields: () => ({
    id: globalIdField('<%= name %>'),
    data: {
      type: GraphQLString,
      description: 'This is the data of the <%= name %>.'
    }
  })
});
