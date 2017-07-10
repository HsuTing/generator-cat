'use strict';

import 'fetch-everywhere';
import {
  Environment,
  Network,
  RecordSource,
  Store,
} from 'relay-runtime';

const source = new RecordSource();
const store = new Store(source);
const network = Network.create((
  operation,
  variables,
  cacheConfig,
  uploadables
) => fetch('/graphql', {
  method: 'POST',
  headers: {
    'content-type': 'application/json'
  },
  body: JSON.stringify({
    query: operation.text,
    variables,
  }),
}).then(response => response.json()));

export default new Environment({
  network,
  store
});
