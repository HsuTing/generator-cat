'use strict';

import React from 'react';
import {mount} from 'enzyme';
import relayQueryLookupRender from 'cat-middleware/lib/koa-relay-query-lookup-render';

import <%= name %> from 'components/<%= name %>';
import environment from 'utils/environment';
import <%= queryName %>Query, {variables as <%= queryName %>Variables} from 'constants/query/<%= queryName %>Query';

let server = null;

describe('<%= name %>', () => {
  beforeAll(() => {
    server = require('./../../server').default;
  });

  it('run', async () => {
    const wrapper = mount(
      <<%= name %> />
    );

    await relayQueryLookupRender(environment, <%= queryName %>Query, <%= queryName %>Variables)({}, () => {});
    expect(wrapper.containsAnyMatchingElements([
      <div>{JSON.stringify({<%= queryName %>: {data: 'query <%= name %>'}})}</div> // eslint-disable-line react/jsx-key
    ])).toBe(true);
  });

  afterAll(() => {
    server.close();
  });
});
