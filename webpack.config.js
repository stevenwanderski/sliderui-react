var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var BUILD_DIR = path.resolve(__dirname, 'build');
var APP_DIR = path.resolve(__dirname, 'src');

var config = {
  context: APP_DIR,
  entry: './index.jsx',
  output: {
    path: BUILD_DIR,
    filename: 'index_bundle.js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.scss']
  },
  module : {
    loaders : [
      {
        test : /\.jsx?/,
        include : APP_DIR,
        loader : 'babel'
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass']
      }

    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'my-index.ejs'
    })
  ],

  devServer: {
    historyApiFallback: true
  }
};

module.exports = config;
