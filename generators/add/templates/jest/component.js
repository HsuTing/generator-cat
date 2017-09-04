'use strict';

import React from 'react';
import renderer from 'react-test-renderer';

import <%= name %> from 'components/<%= name %>';

it('<%= name %>', () => {
  const component = renderer.create(
    <<%= name %> />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
