module.exports = {
  target: 'web',
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-react',
              ['@babel/env', { targets: { browsers: ['last 7 versions'] } }],
            ],
          },
        },
      },
      // {
      //   test: /\.scss$/,
      //   // style-loader собираент стили в один файл, для ssr это не подойдет (берется объект window, работа с DDOM и тп.
      //   // на сервера объекта window быть не должно, поставим другой плагин, который будет стили выбирать и создавать
      //   // отдельный css-файл.
      //   // Будем исп. MiniCssExtractPlugin в webpack.config.client вместо 'style-loader'
      //   use: ['style-loader', 'css-loader', 'sass-loader'],
      // },
    ],
  },
};
