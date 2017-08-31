'use strict';

import assert from 'assert';

export default () => {
  it('src/utils/environment.js', () => {
    assert.jsonFileContent('package.json', {
      scripts: {
        graphql: 'babel src/schemas --out-dir lib/schemas && build-graphql --schema ./lib/schemas/schema.js',
        relay: 'relay-compiler --src ./src --schema ./schema.graphql',
        'relay:watch': 'relay-compiler --src ./src --schema ./schema.graphql --watch'
      }
    });

    assert.file('src/utils/environment.js');
  });
};
