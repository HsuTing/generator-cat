'use strict';

import assert from 'yeoman-assert';

const checkContent = (status, content) => (
  status ?
    assert.fileContent('.eslintrc.js', content) :
    assert.noFileContent('.eslintrc.js', content)
);

export default ({
  website
}) => {
  it('.eslintrc.js', () => {
    assert.jsonFileContent('package.json', {
      scripts: {
        lint: 'eslint --cache ./src --ext .js',
        'lint:watch': 'esw --cache ./src --ext .js -w --color'
      }
    });

    checkContent(website, '\'plugin:react/recommended\',');
    checkContent(website, 'react');
    checkContent(website, 'react: {');
    checkContent(website, 'pragma: \'React\',');
    checkContent(website, 'version: \'15.3\'');
  });
};
