'use strict';

import assert from 'yeoman-assert';

export default () => {
  it('App.js', () => {
    assert.file('App.js');
  });
};
