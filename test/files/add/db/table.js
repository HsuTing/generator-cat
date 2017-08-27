'use strict';

import assert from 'yeoman-assert';

export default () => {
  it('src/constants/tables/users.js', () => {
    assert.fileContent(
      'src/constants/tables/users.js',
      'export const users = (db, type = \'sqlite\') => ('
    );
    assert.fileContent(
      'src/constants/tables/users.js',
      'db.create(\'users\', {'
    );
    assert.fileContent(
      'src/constants/tables/users.js',
      'export const create_users = id => db => ('
    );
    assert.fileContent(
      'src/constants/tables/users.js',
      'db.insert(\'users\', {'
    );
  });
};
