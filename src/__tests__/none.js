'use strict';

import helpers from 'yeoman-test';
import assert from 'yeoman-assert';

import App from 'app';

import {prompts} from './utils/constants';

describe('none', () => {
  describe('# default package.json', () => {
    beforeAll(() => helpers
      .run(App)
      .withPrompts(prompts)
    );

    it('## package.json exist', () => {
      assert.file('package.json');
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

    it('## default files', () => {
      assert.file('.gitignore');
    });
  });

  it('# scripts with using heroku', async () => {
    await helpers
      .run(App)
      .withPrompts({
        ...prompts,
        heroku: true
      });

    assert.jsonFileContent('package.json', {
      scripts: {
        'heroku-postbuild': 'yarn prod'
      }
    });
  });
});
