'use strict';

import assert from 'yeoman-assert';

export default () => {
  it('src/routers/graphql.js', () => {
    assert.file('src/routers/graphql.js');
  });
};
