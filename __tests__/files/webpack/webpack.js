'use strict';

import assert from 'yeoman-assert';

const checkContent = (status, content) => (
  status ?
    assert.fileContent('webpack.config.js', content) :
    assert.noFileContent('webpack.config.js', content)
);

export default ({
  website,
  graphql,
  chooseType
}) => {
  it('webpack.config.js', () => {
    assert.jsonFileContent('package.json', {
      scripts: {
        webpack: 'cross-env NODE_ENV=production webpack',
        'webpack-server': 'webpack-dev-server --content-base src --hot --inline'
      }
    });

    checkContent(website && graphql, 'react-relay');

    if(chooseType === 'docs')
      checkContent(true, 'publicPath: ENV ? \'/test/public/js/\' : \'/assets/\',');
    else
      checkContent(true, 'publicPath: ENV ? \'/public/js/\' : \'/assets/\',');

    if(['docs', 'desktop app'].includes(chooseType))
      checkContent(true, 'path: path.resolve(__dirname, \'./docs/public/js\')');
    else
      checkContent(true, 'path: path.resolve(__dirname, \'./public/js\')');
  });
};
