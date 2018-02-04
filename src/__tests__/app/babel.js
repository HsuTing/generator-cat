'use strict';

import helpers from 'yeoman-test';
import assert from 'yeoman-assert';

import Babel from 'app/Babel';

import render from './../utils/render';

describe('babel', () => {
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

  it('# check .babelrc', () => {
    assert.fileContent('.babelrc.js', render('.babelrc.js'));
  });
});
