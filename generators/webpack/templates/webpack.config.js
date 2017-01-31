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
<% if(graphql) { -%>
      'react-relay',
<% } -%>
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
    path: path.resolve(__dirname, './public/js')
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
