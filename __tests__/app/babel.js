'use strict';

import helpers from 'yeoman-test';
import assert from 'yeoman-assert';

import Babel from 'app/Babel';

import checkContent from './../test-utils/checkContent';

describe('Babel', () => {
  beforeAll(() => helpers.run(Babel));

  it('# scripts', () => {
    assert.jsonFileContent('package.json', {
      scripts: {
        'babel:render': 'babel src --out-dir lib',
        babel: 'rm -rf ./lib && yarn babel:render',
        'babel:watch': 'rm -rf ./lib && yarn babel:render -w'
      }
    });
  });

  it('# check default .babelrc.js', () => {
    checkContent('.babelrc.js');
  });
});
