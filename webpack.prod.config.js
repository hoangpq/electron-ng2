/**
 * Created by Hoang Phan on 7/14/2016.
 */

const fs = require('fs');
const webpack = require('webpack');
const path = require('path');

// auto add prefix use autoprefixer
const cssLoaders = [
  'to-string-loader',
  'css-loader',
  'autoprefixer-loader?browsers=last 1 version'
];

module.exports = {
  devtool: 'source-map',
  entry: {
    'vendor': './app/vendor',
    'app': './app/boot',
  },
  output: {
    path: __dirname,
    filename: 'dist/[name].bundle.js',
  },
  resolve: {
    extensions: ['', '.js', '.ts', '.scss', '.css'],
    root: [path.join(__dirname, './app')],
  },
  module: {
    loaders: [
      {
        test: /\.ts$/,
        loaders: ['ts-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        loader: cssLoaders.join('!')
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin(chunkName = 'vendor', filename = './dist/vendor.bundle.js'),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
      },
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      mangle: false,
      comments: false,
    }),
  ]
};