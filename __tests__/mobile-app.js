'use strict';

import path from 'path';
import helpers from 'yeoman-test';

import defaultSetting from './utils/defaultSetting';

import app from './files/mobile-app/app';
import babelrc from './files/mobile-app/babelrc';
import component from './files/mobile-app/component';
import testApp from './files/mobile-app/test-app';

import gitignore from './files/app/gitignore';
import editorconfig from './files/app/editorconfig';

import jest from './files/test/jest';
import travis from './files/test/travis';

import eslintrc from './files/eslint/eslintrc';

const config = {
  website: true,
  test: true,
  mobileApp: true
};

describe('mobile-app subgenerator', () => {
  beforeAll(() => helpers
    .run(path.resolve(__dirname, './../generators/mobile-app'))
    .withPrompts(defaultSetting));

  app();
  babelrc();
  component();
  testApp();

  gitignore(config);
  editorconfig();

  jest(config);
  travis(config);

  eslintrc(config);
});
