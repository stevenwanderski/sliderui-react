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
    publicPath: '/',
    filename: 'index_bundle.js'
  },
  resolve: {
    root: APP_DIR,
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
    }),

    new webpack.DefinePlugin({
      'process.env':{
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
        'API_URL': JSON.stringify(process.env.API_URL || 'http://localhost:3000')
      }
    }),
  ],
  devtool: 'source-map',

  devServer: {
    historyApiFallback: true
  }
};

module.exports = config;
