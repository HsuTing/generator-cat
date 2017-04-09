'use strict';

const path = require('path');
const process = require('process');
const webpack = require('webpack');

const ENV = process.env.NODE_ENV === 'production';
const src = './src/public';

module.exports = {
  entry: {
    index: path.resolve(src, './index.js'),
    common: [
<% if(relay) { -%>
      'react-relay',
<% } -%>
      'cat-components',
      'radium',
      'radium-normalize',
      'prop-types',
      'react',
      'react-dom'
    ]
  },
  output: {
    filename: ENV ? '[name].min.js' : '[name].js',
    publicPath: '/assets/',
<% if(docs) { -%>
    path: path.resolve(__dirname, './docs/public/js')
<% } else { -%>
    path: path.resolve(__dirname, './public/js')
<% } -%>
  },
  module: {
    rules: [
      {test: /\.js$/, loader: 'babel-loader'}
    ]
  },
  plugins: ENV ? [
    new webpack.DefinePlugin({'process.env': {NODE_ENV: JSON.stringify('production')}}),
    new webpack.optimize.CommonsChunkPlugin({name: 'common', filename: 'common.min.js'}),
    new webpack.optimize.UglifyJsPlugin({sourceMap: true}),
    new webpack.LoaderOptionsPlugin({minimize: true, debug: true})
  ] : [
    new webpack.optimize.CommonsChunkPlugin({name: 'common', filename: 'common.js'}),
    new webpack.HotModuleReplacementPlugin()
  ]
};
