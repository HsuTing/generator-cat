'use strict';

const alias = {};

module.alias = alias;
module.exports = {
  presets: [
    '@babel/preset-env',
    '@babel/preset-stage-0',
    '@babel/preset-flow'
  ],
  plugins: [
    ['module-resolver', {
      root: ['./src'],
      alias
    }]
  ],
  ignore: [
    '**/__tests__/**'
  ]
};
