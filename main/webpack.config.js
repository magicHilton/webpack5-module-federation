const { ModuleFederationPlugin } = require('webpack').container;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
// host
module.exports = {
  entry: './index.js',
  mode: 'development',
  devtool: 'hidden-source-map',
  output: {
    publicPath: 'http://localhost:3002/',
    clean: true,
  },
  resolve: {
    extensions: ['.jsx', '.js', '.json', '.css', '.scss', '.jpg', 'jpeg', 'png'],
  },
  module: {
    rules: [
      {
        test: /\.(jpg|png|gif|jpeg)$/,
        loader: 'url-loader',
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-react'],
        },
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'main_app',
      // 通过remotes 和 exposes 实现联邦模块的共享组件功能；
      remotes: { // 使用到具体的是那个组件库-remote components
        'component-app': 'component_app@http://localhost:3001/remoteEntry.js',
      },
      // exposes: {}, // exposes 表示当前组件需要共享到remotes给其他子应用使用的组件
      // shared 公用的reac 和 react-dom
      shared: { react: { singleton: true }, 'react-dom': { singleton: true } },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};
