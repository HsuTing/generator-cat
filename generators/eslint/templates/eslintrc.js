'use strict';

const fs = require('fs');

// set alias
const {plugins} = JSON.parse(fs.readFileSync('./.babelrc'));
const alias = plugins.slice(-1)[0][1].alias;

module.exports = {
  globals: {
    Promise: true
  },
  extends: [
    'eslint:recommended',
    'google',
<% if(react) { -%>
    'plugin:react/recommended',
<% } -%>
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
<% if(test) { -%>
    jest: true,
<% } -%>
    browser: true,
    node: true
  },
  plugins: [
<% if(react) { -%>
    'react',
<% } -%>
    'import'
  ],
  settings: {
<% if(react) { -%>
    react: {
      pragma: 'React',
      version: '15.3'
    },
<% } -%>
    'import/resolver': {
      'babel-module': alias
    }
  }
};
