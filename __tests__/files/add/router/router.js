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
      'import relayQueryLookupRender from \'cat-middleware/lib/koa-relay-query-lookup-render\';'
    );

    checkContent(website, 'import Index from \'components/Index\';');
    checkContent(website && graphql, 'import environment from \'utils/environment\';');
    checkContent(
      website && graphql,
      'import indexQuery, {variables as indexVariables} from \'constants/query/indexQuery\';'
    );

    checkContent(website, 'const ENV = process.env.NODE_ENV === \'production\';');

    checkContent(true, 'const router = koaRouter().loadMethods();');

    if(website && graphql) {
      checkContent(website && graphql, 'router.get(\'/\',');
      checkContent(website && graphql, 'relayQueryLookupRender(environment, indexQuery, indexVariables),');
      checkContent(website && graphql, '((ctx, next) => reactRender(');
      checkContent(website && graphql, '<Index />, {');
      checkContent(website && graphql, 'js: \'index\',');
      checkContent(website && graphql, 'records: ctx.records,');
      checkContent(website && graphql, 'ENV');
      checkContent(website && graphql, '}');
      checkContent(website && graphql, ')(ctx, next))');
      checkContent(website && graphql, ');');
    } else if(website) {
      checkContent(website, 'router.get(\'/\', reactRender(<Index />, {');
      checkContent(website, 'js: \'index\',');
      checkContent(website, 'ENV');
    } else {
      checkContent(!website, 'router.get(\'/\', ctx => {');
      checkContent(!website, 'ctx.body = \'Hello World\';');
    }
  });
};
