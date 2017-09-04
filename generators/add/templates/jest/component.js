'use strict';

import React from 'react';
import {shallow} from 'enzyme';

import <%= name %> from 'components/<%= name %>';

it('<%= name %>', () => {
  const wrapper = shallow(
    <<%= name %> />
  );
  expect(wrapper.html()).toBe('This is <%= name %>!');
});
