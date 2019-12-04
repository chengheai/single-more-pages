const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
module.exports = {
  entry: __dirname + '/src/page_1/js/index.js', // 已多次提及的唯一入口文件
  output: {
    filename: 'js/bundle-[hash].js', // 打包后输出文件的文件名
    path: path.resolve(__dirname, 'dist/page_1'), // 打包后的文件存放的地方
    // path: __dirname + "/public"
    publicPath: 'https://cdn.xxx.com/pages/page_1/',
    // publicPath: '/'
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
          // publicPath: "/",
          publicPath: 'https://cdn.xxx.com/pages/page_1/',
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
          publicPath: 'https://cdn.xxx.com/pages/page_1/',
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
        // use: ['file-loader']
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
    new webpack.HotModuleReplacementPlugin(), // 热加载插件
    new CleanWebpackPlugin(['dist']), // 加载清理之前生成的文件的插件
    new HtmlWebpackPlugin({
      template: __dirname + '/src/page_1/index.html',
      inject: true, // new 一个这个插件的实例，并传入相关的参数
    }),
    new ExtractTextPlugin({
      filename: 'css/bundle-[hash].css',
      disable: false,
      allChunks: true,
    }),
  ],
};
