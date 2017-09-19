'use strict';

import {graphqlToTable, type} from 'cat-graphql/lib/backend';

export default (() => {
  try {
    return graphqlToTable(
      './../../schema.graphql', [
        type.sequelize()
      ], [
        'Query',
        'Node',
        'PageInfo'
      ]
    );
  } catch(e) {
    /* istanbul ignore next */
    return {};
  }
})();
