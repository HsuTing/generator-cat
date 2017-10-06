'use strict';

import React from 'react';
import {mount} from 'enzyme';
import relayData from 'cat-middleware/lib/koa-relay-data';

import <%= name %> from 'components/<%= name %>';
import <%= queryName %>Query, {variables as <%= queryName %>Variables} from 'constants/query/<%= queryName %>Query';
import {fetchStore} from 'utils/environment';

describe('<%= name %>', () => {
  beforeAll(async () => {
    const server = require('./../../server').default;
    const ctx = {};

    await relayData('http://localhost:8000/graphql/', <%= queryName %>Query, <%= queryName %>Variables)(ctx, () => {});

    server.close();
    fetchStore.add = ctx.graphql_data;
    global.wrapper = mount(<<%= name %> />);
  });

  it('run', async () => {
    expect(global.wrapper.containsAnyMatchingElements([
      <div>{JSON.stringify({<%= queryName %>: {data: 'query <%= name %>'}})}</div> // eslint-disable-line react/jsx-key
    ])).toBe(true);
  });
});
