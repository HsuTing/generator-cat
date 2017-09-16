'use strict';

import assert from 'yeoman-assert';

const checkContent = (status, content) => (
  status ?
    assert.fileContent('src/server.js', content) :
    assert.noFileContent('src/server.js', content)
);

export default ({
  website,
  graphql
}) => {
  it('src/server.js', () => {
    assert.jsonFileContent('package.json', {
      scripts: {
        'test-server': 'nodemon ./lib/server.js',
        start: 'NODE_ENV=production node ./lib/server.js'
      }
    });

    checkContent(website || graphql, 'import mount from \'koa-mount\';');

    checkContent(website, 'import serve from \'koa-static\';');
    checkContent(website, 'import minify from \'koa-html-minifier\';');

    checkContent(website, 'app.use(mount(\'/public\', serve(');
    checkContent(website, 'path.resolve(root, \'public\')');
    checkContent(website, 'app.use(minify({');
    checkContent(website, 'removeComments: true,');
    checkContent(website, 'collapseWhitespace: true,');
    checkContent(website, 'minifyCSS: true,');
    checkContent(website, 'minifyURLs: true,');
    checkContent(website, 'minifyJS: true');

    checkContent(graphql, 'import graphql from \'koa-graphql\';');
    checkContent(graphql, 'import schema from \'schemas/schema\';');

    checkContent(graphql, 'app.use(mount(\'/graphql\', graphql({');
    checkContent(graphql, 'schema,');
    checkContent(graphql, 'graphiql: !ENV,');
    checkContent(graphql, 'pretty: !ENV,');
    checkContent(graphql, 'formatError: /* istanbul ignore next */ error => {');
    checkContent(graphql, 'console.log(error);');
    checkContent(graphql, 'return error;');
  });
};
