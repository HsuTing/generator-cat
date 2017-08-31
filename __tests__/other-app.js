'use strict';

import path from 'path';
import helpers from 'yeoman-test';

import defaultSetting from './utils/defaultSetting';
import npmignore from './files/npm/npmignore';
import pkg from './files/pkg';

describe('other app test', () => {
  describe('# use npm and test at the same time', () => {
    beforeAll(() => helpers
      .run(path.resolve(__dirname, './../generators/app'))
      .withPrompts({
        ...defaultSetting,
        website: false,
        chooseType: 'none',
        plugins: ['npm', 'test']
      }));

    npmignore({test: true});
  });

  describe('# no keywords', () => {
    const config = {
      ...defaultSetting,
      website: false,
      chooseType: 'none',
      keywords: undefined,
      plugins: []
    };

    beforeAll(() => helpers
      .run(path.resolve(__dirname, './../generators/app'))
      .withPrompts(config));

    pkg(config);
  });
});
