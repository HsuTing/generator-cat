'use strict';

import assert from 'yeoman-assert';

export default ({
  website,
  graphql,
  chooseType,
  heroku,
  keywords
}) => {
  it('package.json', () => {
    const relay = graphql && website;
    const baseScript = relay ? ['yarn graphql', 'yarn relay'] : [];
    const build = baseScript.concat(['yarn babel']);
    const prod = baseScript.concat(['yarn babel']);
    const watch = [
      'concurrently -c green',
      '"yarn lint:watch"',
      '"yarn babel:watch"'
    ];

    if(website) {
      if(['docs', 'desktop app'].includes(chooseType)) {
        build.push('static static.config.js');
        prod.push('cross-env NODE_ENV=production static static.config.js');
      }

      prod.push('yarn webpack');
      watch.push('"yarn webpack-server"');
    }

    if(relay)
      watch.push('"yarn relay:watch"');

    const scripts = {
      build: build.join(' && '),
      prod: prod.join(' && '),
      watch: watch.join(' ')
    };

    if(heroku)
      scripts['heroku-postbuild'] = 'yarn prod';

    assert.jsonFileContent('package.json', {
      name: 'test',
      description: 'desc',
      author: {
        name: 'HsuTing',
        email: 'hsuting0106@gmail.com',
        url: 'http://hsuting.com'
      },
      scripts,
      main: chooseType === 'desktop app' ? './index.js' : './lib/index.js',
      keywords: keywords ? keywords : [],
      'pre-commit': [
        'lint'
      ],
      homepage: 'https://github.com/HsuTing/test/',
      repository: {
        type: 'git',
        url: 'get+https://github.com/HsuTing/test.git'
      },
      bugs: {
        url: 'https://github.com/HsuTing/test/issues/'
      }
    });
  });
};
