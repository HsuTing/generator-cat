'use strict';

import fs from 'fs';
import {
  GraphQLSchema,
  GraphQLObjectType
} from 'graphql';

let query = {};
let mutation = {};

fs.readdirSync(__dirname)
  .filter(file => !(file[0] === '.' || file === 'schema.js'))
  .forEach(file => {
    const name = file.replace('.js', '');
    const schema = require(`./${name}`).default || require(`./${name}`);

    query = {
      ...query,
      ...schema.query
    };

    mutation = {
      ...mutation,
      ...schema.mutation
    };
  });

export default new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    description: 'all queries',
    fields: () => query
  }),
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    description: 'all mutations',
    fields: () => mutation
  })
});
