'use strict';

import fs from 'fs';
import path from 'path';
import helpers from 'yeoman-test';
import assert from 'yeoman-assert';

import Babel from 'app/Babel';

let dir = null;

describe('babel', () => {
  beforeAll(async () => {
    dir = await helpers.run(Babel);
  });

  it('# scripts', () => {
    assert.jsonFileContent('package.json', {
      scripts: {
        'babel:render': 'babel src --out-dir lib --ignore __tests__',
        babel: 'rm -rf ./lib && yarn babel:render',
        'babel:watch': 'rm -rf ./lib && yarn babel:render -w'
      }
    });
  });

  it('# check .babelrc', () => {
    assert.jsonFileContent('.babelrc', {
      presets: [
        'env',
        'stage-0',
        'flow'
      ],
      plugins: [
        ['module-resolver', {
          root: ['./src']
        }]
      ]
    });
  });

  it('# src exist', () => {
    expect(
      fs.existsSync(path.resolve(dir, './src'))
    ).toBe(true);
  });
});
