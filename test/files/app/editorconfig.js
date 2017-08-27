'use strict';

import assert from 'yeoman-assert';

export default () => {
  it('.editorconfig', () => {
    assert.file('.editorconfig');
  });
};
