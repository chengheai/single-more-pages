const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const fs = require('fs');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const html = require('html-withimg-loader');
const CleanWebpackPlugin = require('clean-webpack-plugin');
module.exports = {
  entry: __dirname + '/src/page_1/js/index.js',
  output: {
    path: path.resolve(__dirname, '/dist'), //打包后的文件存放的地方
    filename: 'bundle.js', //打包后输出文件的文件名
    // publicPath: 'https://cdn.xxx.com/pages/'
    // publicPath: '/'
  },
  devtool: 'eval-source-map',
  devServer: {
    contentBase: './dist', //本地服务器所加载的页面所在的目录
    historyApiFallback: true, //不跳转
    host: 'localhost',
    inline: true, //实时刷新
    hot: true,
  },
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
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader'],
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
  plugins: [
    new webpack.HotModuleReplacementPlugin(), //热加载插件
    new CleanWebpackPlugin(['dist']), // 加载清理之前生成的文件的插件
    new HtmlWebpackPlugin({
      template: __dirname + '/src/page_1/index.html',
      inject: true, //new 一个这个插件的实例，并传入相关的参数
    }),
    new ExtractTextPlugin({
      filename: 'bundle-[hash].css',
      disable: false,
      allChunks: true,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"',
      },
    }),
  ],
};
