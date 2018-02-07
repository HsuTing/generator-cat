'use strict';

import helpers from 'yeoman-test';
import assert from 'yeoman-assert';

import Eslint from 'app/Eslint';

import checkContent from './../test-utils/checkContent';

describe('Eslint', () => {
  beforeAll(() => helpers.run(Eslint));

  it('# scripts', () => {
    assert.jsonFileContent('package.json', {
      scripts: {
        lint: 'esw ./ --cache --ext .js',
        'lint:watch': 'yarn lint -w'
      }
    });
  });

  it('# check default .eslintrc.js', () => {
    checkContent('.eslintrc.js');
  });

  it('# check default .eslintignore', () => {
    checkContent('.eslintignore');
  });
});
