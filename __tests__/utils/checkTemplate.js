'use strict';

import assert from 'yeoman-assert';

export default (status, content) => (
  status ?
    assert.fileContent('views/template.html', content) :
    assert.noFileContent('views/template.html', content)
);
