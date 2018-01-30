'use strict';

const {alias} = require('./.babelrc');

module.exports = {
  globals: {
    Promise: true
  },
  extends: [
    'plugin:flowtype/recommended',
    'eslint:recommended',
    'google',
    'cat'
  ],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 7,
    sourceType: 'module',
    ecmaFeatures: {
      objectLiteralDuplicateProperties: true
    }
  },
  env: {
    jest: true,
    browser: true,
    node: true
  },
  plugins: [
    'import',
    'flowtype'
  ],
  settings: {
    'import/resolver': {
      'babel-module': alias
    },
    flowtype: {
      onlyFilesWithFlowAnnotation: true
    }
  }
};
