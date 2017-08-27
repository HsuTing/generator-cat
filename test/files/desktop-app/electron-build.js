'use strict';

import assert from 'yeoman-assert';

export default () => {
  it('src/bin/build-app.js', () => {
    assert.fileContent('src/bin/build-app.js', 'appCopyright: \'HsuTing\',');
    assert.fileContent('src/bin/build-app.js', 'name: \'test\',');
  });
};
