const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
  entry: require('./build/entry.js'),
  output: {
    path: path.resolve(__dirname, 'dist'), //打包后的文件存放的地方
    filename: '[name]/js/[name]-[hash].js', //打包后输出文件的文件名
    // publicPath: 'https://cdn.xxx.com/pages/', // cdn地址

    publicPath: '/',
  },
  devtool: 'eval-source-map',
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        use: {
          loader: 'babel-loader',
        },
        exclude: /node_modules/,
      },
      {
        test: /\.(htm|html)$/i,
        loader: 'html-withimg-loader',
      },
      {
        test: /.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader',
          publicPath: '/',
          // publicPath: 'https://cdn.xxx.com/pages/',
        }),
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: true,
              },
            },
            {
              loader: 'less-loader',
            },
          ],
          fallback: 'style-loader',
          publicPath: 'h/',
          // publicPath: 'https://cdn.xxx.com/pages/',
        }),
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: 'img/[hash:8].[name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(csv|tsv)$/,
        use: ['csv-loader'],
      },
      {
        test: /\.xml$/,
        use: ['xml-loader'],
      },
    ],
  },
  plugins: require('./build/base_plugin.js'),
};
