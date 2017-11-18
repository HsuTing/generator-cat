'use strict';

import assert from 'yeoman-assert';

export default ({
  website,
  graphql
}) => {
  it('.eslintignore', () => {
    if(website && graphql)
      assert.file('.eslintignore');
    else
      assert.noFile('.eslintignore');
  });
};
