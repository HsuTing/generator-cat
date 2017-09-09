'use strict';

import React from 'react';
import renderer from 'react-test-renderer';

import App from 'components/App';

it('App', () => {
  const rendered = renderer.create(<App />).toJSON();

  expect(rendered).toBeTruthy();
});
