'use strict';

import assert from 'yeoman-assert';

export default () => {
  it('src/components/App.js', () => {
    assert.file('src/components/App.js');
  });
};
