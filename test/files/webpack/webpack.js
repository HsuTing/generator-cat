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
        babel: 'rm -rf ./lib && babel src --out-dir lib',
        'babel:watch': 'rm -rf ./lib && babel -w src --out-dir lib'
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
