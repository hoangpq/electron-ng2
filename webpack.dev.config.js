const webpack = require("webpack");
const path = require('path');

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://localhost:2222',
    'webpack/hot/dev-server',
    './app/vendor',
    './app/boot',
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: 'http://localhost:2222/dev/'
  },
  resolve: {
    extensions: ['', '.js', '.ts', '.scss'],
  },
  module: {
    loaders: [
      {
        test: /\.ts/,
        loaders: ['ts-loader?transpileOnly=true'],
        exclude: /node_modules/,
      },
      {
        test: /\.scss/,
        loaders: ['raw-loader', 'sass-loader'],
        exclude: /node_modules/,
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development'),
      },
    }),
  ],
};