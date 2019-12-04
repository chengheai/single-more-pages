// webpack 插件配置文件
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const pagesArray = require('./webpackHtmlPlugin.js'); // 引入HtmlWebpackPlugin的配置文件
let base_plugin = [
  new webpack.HotModuleReplacementPlugin(), //热加载插件
  new CleanWebpackPlugin(['dist']), // 加载清理之前生成的文件的插件
  new ExtractTextPlugin({
    filename: '[name]/css/bundle-[hash].css',
    disable: false,
    allChunks: true,
  }),
];
// 遍历添加多个HtmlWebpackPlugin插件
pagesArray.forEach(page => {
  const htmlPlugin = new HtmlWebpackPlugin({
    template: page.template,
    filename: page.filename,
    chunks: [page.chunksName],
    inject: true,
  });
  base_plugin.push(htmlPlugin);
  // console.log('base,,,,', base_plugin)
});
// console.log(pagesArray, 'Pages')
module.exports = base_plugin;
