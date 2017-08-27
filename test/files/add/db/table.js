'use strict';

import assert from 'yeoman-assert';

export default () => {
  it('src/constants/tables/users.js', () => {
    assert.fileContent(
      'src/constants/tables/users.js',
      'db.create(\'users\', {'
    );
    assert.fileContent(
      'src/constants/tables/users.js',
      'db.insert(\'users\', {'
    );
  });
};
