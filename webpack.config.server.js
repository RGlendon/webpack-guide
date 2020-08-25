const path = require('path');
const merge = require('webpack-merge');
// добавим расширение для Node.js.
// Динамические импорты не будут юзаться?
const webpackNodeExternals = require('webpack-node-externals');
// на сервере нам не нужен CSS, для его игнорирования есть плагин 'null-loader'


const baseConfig = require('./webpack.config.base');

module.exports = merge(baseConfig, {
  mode: 'production',
  target: 'node',
  entry: './src/server.js',
  externals: [webpackNodeExternals()],
  output: {
    // помещать файл сервера в dist не очень хорошая затея
    filename: 'server.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: 'null-loader',
      },
    ]
  },
});
