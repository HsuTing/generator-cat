'use strict';

import helpers from 'yeoman-test';
import assert from 'yeoman-assert';

import App from 'app';

import checkContent from './../utils/checkContent';

describe('App', () => {
  describe('# default package.json', () => {
    beforeAll(() => {
      return helpers.run(App)
        .withPrompts({
          name: 'test',
          description: 'description',
          keywords: ['keyword'],
          author_name: 'HsuTing',
          author_email: 'hsuting0106@gmail.com',
          author_url: 'http://hsuting.com',
          type: 'none',
          addons: []
        });
    });

    it('## ask default info', () => {
      assert.jsonFileContent('package.json', {
        name: 'test',
        description: 'description',
        keywords: ['keyword']
      });
    });

    it('## ask author info', () => {
      assert.jsonFileContent('package.json', {
        author: {
          name: 'HsuTing',
          email: 'hsuting0106@gmail.com',
          url: 'http://hsuting.com'
        }
      });
    });

    it('## ask default info', () => {
      assert.jsonFileContent('package.json', {
        version: '0.1.0',
        main: './lib/index.js',
        homepage: `https://github.com/HsuTing/test/`,
        repository: {
          type: 'git',
          url: `get+https://github.com/HsuTing/test.git`
        },
        bugs: {
          url: `https://github.com/HsuTing/test/issues/`
        }
      });
    });

    it('## scripts', () => {
      assert.jsonFileContent('package.json', {
        scripts: {
          build: 'yarn babel',
          prod: 'yarn babel',
          watch: 'concurrently -c green "yarn lint:watch" "yarn babel:watch"'
        }
      });
    });

    it('## check .gitignore', () => {
      checkContent('.gitignore');
    });
  });

  it('# scripts with using heroku', async () => {
    await helpers
      .run(App)
      .withPrompts({
        heroku: true
      });

    assert.jsonFileContent('package.json', {
      scripts: {
        'heroku-postbuild': 'yarn prod'
      }
    });
  });
});
