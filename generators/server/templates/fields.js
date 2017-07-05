'use strict';

import {
  nodeDefinitions,
  fromGlobalId
} from 'graphql-relay';

export default nodeDefinitions(
  (globalId, ctx) => {
    // get data from db with type and other information in ctx
    const {type} = fromGlobalId(globalId);

    switch(type) {
      default: return null;
    }
  }, obj => {
    // return the schema which is interfaced Node.
    return null;
  }
);
