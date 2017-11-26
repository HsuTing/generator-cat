'use strict';

import 'fetch-everywhere';
import {
  Environment,
  Network,
  RecordSource,
  Store
} from 'relay-runtime';
import FetchStore from 'cat-utils/lib/fetchStore';

export const link = (
  process.env.TYPE === 'client' ?
    /* istanbul ignore next */ '/graphql/' :
    `http://localhost:${
      process.env.NODE_ENV === 'production' ? /* istanbul ignore next */ process.env.PORT : 8000
    }/graphql/`
);

export const fetchStore = new FetchStore(
  /* istanbul ignore next */
  process.env.TYPE === 'client' ?
    data : // eslint-disable-line no-undef
    null
);

const source = new RecordSource();
const store = new Store(source);
const network = Network.create(fetchStore.fetch(link));

export default new Environment({
  network,
  store
});
