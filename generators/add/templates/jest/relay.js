'use strict';

import React from 'react';
import {mount} from 'enzyme';
import relayQueryLookupRender from 'cat-middleware/lib/koa-relay-query-lookup-render';

import <%= name %> from 'components/<%= name %>';
import environment from 'utils/environment';
import <%= queryName %>Query, {variables as <%= queryName %>Variables} from 'constants/query/<%= queryName %>Query';

const wrapper = mount(
  <<%= name %> />
);
let server = null;

describe('<%= name %>', () => {
  beforeAll(async () => {
    server = require('./../../server').default;
    await relayQueryLookupRender(environment, <%= queryName %>Query, <%= queryName %>Variables)({}, () => {});
  });

  it('run', async () => {
    expect(wrapper.containsAnyMatchingElements([
      <div>{JSON.stringify({<%= queryName %>: {data: 'query <%= name %>'}})}</div> // eslint-disable-line react/jsx-key
    ])).toBe(true);
  });

  afterAll(() => {
    server.close();
  });
});
