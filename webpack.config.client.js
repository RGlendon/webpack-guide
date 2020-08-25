const path = require('path');
// у нас будет серверный рендеринг, поэтому HtmlWebPackPlugin нам здесь не нужен
// const HtmlWebPackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// позволяет узнать какой хеш подставить в script. Он создает JSON-файл, в котором хранится все статистика build'a
// и названия хешей
const {StatsWriterPlugin} = require('webpack-stats-plugin');

const baseConfig = require('./webpack.config.base');

module.exports = merge(baseConfig, {
  mode: 'production',
  entry: './src/client.js',
  output: {
    filename: 'bundle.[chunkhash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
    ]
  },
  optimization: {
    minimizer: [
      new UglifyJSPlugin({
        cache: true,
        parallel: true,
        uglifyOptions: {
          compress: false,
          ecma: 6,
          mangle: true,
        },
        sourceMap: false,
      }),
    ],
  },
  plugins: [
    new CompressionPlugin(),
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new StatsWriterPlugin({
      // по умолчанию создаст stats.json в папке dist
      // filename: 'stats.json',
      stats: {
        all: false,
        assets: true
      }
    }),
    new MiniCssExtractPlugin({
      filename: 'styles.[chunkhash].css'
    })
  ],

  devtool: 'inline-source-map',
});
