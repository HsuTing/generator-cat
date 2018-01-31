'use strict';

import fs from 'fs';
import path from 'path';
import helpers from 'yeoman-test';
import assert from 'yeoman-assert';

import Babel from 'app/Babel';
import render from 'utils/render';

let dir = null;

describe('babel', () => {
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

  it('# check .babelrc', () => {
    assert.fileContent('.babelrc.js', render('.babelrc.js'));
  });

  it('# src exist', () => {
    expect(
      fs.existsSync(path.resolve(dir, './src'))
    ).toBe(true);
  });
});
