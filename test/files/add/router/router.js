'use strict';

import assert from 'yeoman-assert';

const checkContent = (status, content) => (
  status ?
    assert.fileContent('src/routers/index.js', content) :
    assert.noFileContent('src/routers/index.js', content)
);

export default ({
  website
}) => {
  it('src/routers/index.js', () => {
    checkContent(website, 'import process from \'process\';');
    checkContent(website, 'import React from \'react\';');
    checkContent(website, 'import reactRender from \'cat-middleware/lib/koa-react-render\';');
    checkContent(website, 'import Index from \'components/Index\';');

    checkContent(website, 'const ENV = process.env.NODE_ENV === \'production\';');

    checkContent(true, 'const router = Router().loadMethods();');

    if(website) {
      checkContent(website, 'router.get(\'/\', reactRender(<Index />, {');
      checkContent(website, 'js: \'index\',');
      checkContent(website, 'ENV');
    } else {
      checkContent(!website, 'router.get(\'/\', ctx => {');
      checkContent(!website, 'ctx.body = \'Hello World\';');
    }
  });
};
