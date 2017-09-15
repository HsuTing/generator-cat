'use strict';

import {graphqlToTable, type} from 'cat-graphql/lib/backend';

export default graphqlToTable(
  './../../schema.graphql', [
    type.sequelize()
  ], [
    'Query',
    'Node',
    'PageInfo'
  ]
);
