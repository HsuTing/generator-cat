'use strict';

module.exports = {
  extends: [
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
  }
};
