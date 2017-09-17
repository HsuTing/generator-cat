'use strict';

import 'fetch-everywhere';
import {
  Environment,
  Network,
  RecordSource,
  Store
} from 'relay-runtime';

/* istanbul ignore next */
const source = (
  process.env.TYPE === 'client' ?
    new RecordSource(records) : // eslint-disable-line no-undef
    new RecordSource()
);
const store = new Store(source);
/* istanbul ignore next */
const link = (
  process.env.TYPE === 'client' ?
    '/graphql' :
    `http://localhost:${process.env.NODE_ENV === 'production' ? process.env.PORT : 8000}/graphql`
);
const network = Network.create((
  operation,
  variables
) => fetch(link, {
  method: 'POST',
  headers: {
    'content-type': 'application/json'
  },
  body: JSON.stringify({
    query: operation.text,
    variables
  })
}).then(response => response.json()));

export default new Environment({
  network,
  store
});
