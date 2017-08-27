'use strict';

import {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString
} from 'graphql';
import {globalIdField} from 'graphql-relay';

import fields from 'schemas/fields';

const {nodeInterface} = fields;

export const dataFields = {
  name: '<%= name %>',
  description: 'This is the type of the <%= name %>.',
  fields: {
    data: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'This is the data of the <%= name %>.'
    }
  }
};

export default new GraphQLObjectType({
  ...dataFields,
  interfaces: [nodeInterface],
  fields: {
    ...dataFields.fields,
    id: globalIdField('<%= name %>')
  }
});
