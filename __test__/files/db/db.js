'use strict';

import assert from 'yeoman-assert';

export default () => {
  it('src/bin/db.js', () => {
    assert.jsonFileContent('package.json', {
      scripts: {
        db: 'node ./lib/bin/db.js',
        'db-shell': 'db-shell'
      }
    });

    assert.file('src/bin/db.js');
  });
};
