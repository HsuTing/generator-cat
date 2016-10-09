var path = require('path');
var webpack = require('webpack');

var src = './src/public';
var dist = './public/js';

var ENV = Boolean(Number(process.env.NODE_ENV) || 0);

module.exports = {
  entry: {
    <%= name %>: path.resolve(src, './<%= componentName %>.js'),
    common: [
<% if(router) { -%>
      'react-router',
<% } -%>
<% if(redux) { -%>
      'redux',
      'react-redux',
<% } -%>
<% if(radium) { -%>
      'radium',
      'radium-normalize',
<% } -%>
      'react',
      'react-dom'
    ]
  },
  output: {
    filename: ENV ? '[name].min.js' : '[name].js',
    publicPath: '/assets/',
    path: dist
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
