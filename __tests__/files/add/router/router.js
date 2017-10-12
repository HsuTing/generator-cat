'use strict';

import assert from 'yeoman-assert';

const checkContent = (status, content) => (
  status ?
    assert.fileContent('src/routers/index.js', content) :
    assert.noFileContent('src/routers/index.js', content)
);

export default ({
  website,
  graphql
}) => {
  it('src/routers/index.js', () => {
    checkContent(website && graphql, 'import \'babel-polyfill\';');

    checkContent(website, 'import process from \'process\';');
    checkContent(website, 'import React from \'react\';');
    checkContent(website, 'import reactRender from \'cat-middleware/lib/koa-react-render\';');
    checkContent(
      website && graphql,
      'import relayData from \'cat-middleware/lib/koa-relay-data\';'
    );

    checkContent(website, 'import Index from \'components/Index\';');
    checkContent(website && graphql, 'import {link, fetchStore} from \'utils/environment\';');
    checkContent(
      website && graphql,
      'import indexQuery, {variables as indexVariables} from \'constants/query/indexQuery\';'
    );

    checkContent(website, 'const ENV = process.env.NODE_ENV === \'production\';');

    checkContent(true, 'const router = koaRouter().loadMethods();');

    if(website && graphql) {
      checkContent(true, 'router.get(\'/\',');
      checkContent(true, 'relayData(link, indexQuery, indexVariables),');
      checkContent(true, '(ctx, next) => {');
      checkContent(true, 'fetchStore.add = ctx.graphql_data;');
      checkContent(true, 'return next();');
      checkContent(true, '},');
      checkContent(true, '((ctx, next) => reactRender(');
      checkContent(true, '<Index />, {');
      checkContent(true, 'js: \'index\',');
      checkContent(true, 'ENV');
      checkContent(true, '}');
      checkContent(true, ')(ctx, next))');
      checkContent(true, ');');
    } else if(website) {
      checkContent(true, 'router.get(\'/\', reactRender(<Index />, {');
      checkContent(true, 'js: \'index\',');
      checkContent(true, 'ENV');
    } else {
      checkContent(true, 'router.get(\'/\', ctx => {');
      checkContent(true, 'ctx.body = \'Hello World\';');
    }
  });
};
