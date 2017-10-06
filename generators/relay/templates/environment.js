'use strict';

import 'fetch-everywhere';
import {
  Environment,
  Network,
  RecordSource,
  Store
} from 'relay-runtime';

class FetchStore {
  constructor(data) {
    this.data = data;

    this.fetch = this.fetch.bind(this);
  }

  set add(data) {
    this.data = data;
  }

  fetch(operation, variables, cacheConfig) {
    /* istanbul ignore else */
    if(this.data) {
      const {...output} = this.data;
      this.data = null;

      return output;
    }

    /* istanbul ignore next */
    return fetch(link, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        query: operation.text,
        variables
      })
    }).then(response => response.json());
  }
}

export const fetchStore = new FetchStore(
  /* istanbul ignore next */
  process.env.TYPE === 'client' ?
    data : // eslint-disable-line no-undef
    null
);
const source = new RecordSource();
const store = new Store(source);
export const link = (
  process.env.TYPE === 'client' ?
    /* istanbul ignore next */ '/graphql/' :
    `http://localhost:${
      process.env.NODE_ENV === 'production' ? /* istanbul ignore next */ process.env.PORT : 8000
    }/graphql/`
);
const network = Network.create(fetchStore.fetch);

export default new Environment({
  network,
  store
});
