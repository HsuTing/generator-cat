'use strict';

import path from 'path';
import helpers from 'yeoman-test';
import assert from 'yeoman-assert';

// reducer
import reducer from './files/add/reducer/reducer';
import action from './files/add/reducer/action';

describe('add subgenerator', () => {
  describe('# router', () => {
    before(() => helpers
      .run(path.resolve(__dirname, './../generators/add'))
      .withPrompts({
        items: ['router'],
        name: 'test'
      }));

    it('src/routers/test.js', () => {
      assert.fileContent(
        'src/routers/test.js',
        'const router = Router({prefix: \'/test\'}).loadMethods();'
      );
    });
  });

  describe('# reducer', () => {
    before(() => helpers
      .run(path.resolve(__dirname, './../generators/add'))
      .withPrompts({
        items: ['reducer'],
        name: 'test'
      }));

    reducer();
    action();
  });
});
