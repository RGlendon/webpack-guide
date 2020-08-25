const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const merge = require('webpack-merge');

const baseConfig = require('./webpack.config.base');

module.exports = merge(baseConfig, {
  mode: 'development',
  entry: './src/client.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        // style-loader собираент стили в один файл, для ssr это не подойдет (берется объект window, работа с DDOM и тп.
        // на сервера объекта window быть не должно, поставим другой плагин, который будет стили выбирать и создавать
        // отдельный css-файл.
        // Будем исп. MiniCssExtractPlugin в webpack.config.client вместо 'style-loader'
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './index.html',
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    contentBase: './public',
    hot: true,
    port: 3001,
    open: true,
    historyApiFallback: true,
  },
  devtool: 'inline-source-map',
});
