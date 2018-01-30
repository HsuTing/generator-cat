'use strict';

const alias = {};

module.exports = alias;
module.exports = {
  presets: [
    ['@babel/preset-env', {
      targets: {
        node: true
      }
    }],
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
    ...(process.env.NODE_ENV === 'test' ? [] : [
      '**/__tests__/**'
    ])
  ]
};
