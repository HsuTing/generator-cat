'use strict';

import React from 'react';
import {mount} from 'enzyme';

import <%= name %> from 'components/<%= name %>';

it('<%= name %>', () => {
  const wrapper = mount(
    <<%= name %> />
  );
  
  expect(wrapper.containsAnyMatchingElements([
    <div>This is <%= name %>!</div> // eslint-disable-line react/jsx-key
  ])).toBe(true);
});
