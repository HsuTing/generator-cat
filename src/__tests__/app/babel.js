'use strict';

import helpers from 'yeoman-test';
import assert from 'yeoman-assert';

import Babel from 'app/Babel';
import checkFile from 'bin/core/checkFile';

import render from './../utils/render';

describe('Babel', () => {
  let dir = null;

  beforeAll(async () => {
    dir = await helpers.run(Babel);
  });

  it('# scripts', () => {
    assert.jsonFileContent('package.json', {
      scripts: {
        'babel:render': 'babel src --out-dir lib',
        babel: 'rm -rf ./lib && yarn babel:render',
        'babel:watch': 'rm -rf ./lib && yarn babel:render -w'
      }
    });
  });

  it('# check default .babelrc', () => {
    expect(
      checkFile(
        render(dir, '.babelrc.js'),
        '.babelrc.js'
      ).length
    ).toBe(1);
  });
});
