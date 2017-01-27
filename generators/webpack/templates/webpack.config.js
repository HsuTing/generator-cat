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
<% if(router) { -%>
      'react-router',
<% } -%>
<% if(redux) { -%>
      'redux',
      'react-redux',
<% } -%>
      'radium',
      'radium-normalize',
      'react',
      'react-dom'
    ]
  },
  output: {
    filename: ENV ? '[name].min.js' : '[name].js',
    publicPath: '/assets/',
    path: './public/js'
  },
  module: {
    loaders: [
      {test: /\.js$/, loader: 'babel'}
    ]
  },
  resolve: {
    extensions: ['', '.js']
  },
  plugins: ENV ? [
    new webpack.DefinePlugin({'process.env': {NODE_ENV: JSON.stringify('production')}}),
    new webpack.optimize.CommonsChunkPlugin('common', 'common.min.js'),
    new webpack.optimize.UglifyJsPlugin({minimize: true}),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin()
  ] : [
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.CommonsChunkPlugin('common', 'common.js'),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
};
