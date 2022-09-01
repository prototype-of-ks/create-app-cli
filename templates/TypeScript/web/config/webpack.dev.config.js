'use strict';
process.env.NODE_ENV = 'development';

const paths = require('./paths');
const path = require('path');
const fs = require('fs');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');

const useTypeScript = fs.existsSync(paths.appTsConfig);
const cssRegex = /\.css$/i;
const jsRegex = /\.js(x)?$/i;
const tsRegx = /\.ts(x)?$/i;
const isEnvProduction = process.env.NODE_ENV === 'production';
const isEnvDevelopment = process.env.NODE_ENV === 'development';

module.exports = {
  mode: 'development',
  entry: paths.appIndexJs,
  output: {
    path: paths.appBuild,
    filename: isEnvProduction
      ? 'js/[name].[contenthash:8].js'
      : isEnvDevelopment && 'js/bundle.js',
    chunkFilename: isEnvProduction 
      ? 'js/[name].[contenthash:8].chunk.js'
      : isEnvDevelopment && 'js/[name].chunk.js',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', 'json'],
    modules: [path.resolve(__dirname, 'node_modules')],
  },
  module: {
    rules: [
      {
        test: cssRegex,
        use: [
          MiniCssExtractPlugin.loader, 
          'css-loader',
        ],
        exclude: /node_modules/,
      },
      useTypeScript ? {
        test: tsRegx,
        use: ['ts-loader'],
        include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/,
      } : null,
      // useTypeScript ? {
      //   test: tsRegx,
      //   use: ['tslint-loader'],
      //   exclude: /node_modules/,
      //   enforce: 'pre',
      // } : null,
      {
        test: jsRegex,
        use: ['babel-loader?cacheDirectory'],
        include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: isEnvProduction 
        ? 'css/[name].[contenthash:8].css' 
        : isEnvDevelopment && 'css/[name].css',
      chunkFilename: isEnvProduction 
        ? 'css/[name].[contenthash:8].css' 
        : isEnvDevelopment && 'css/[name].css',
    }),
    new HtmlWebpackPlugin({
      template: paths.appHtml,
      inject: 'body',
    }),
  ],
  optimization: {
    minimize: isEnvProduction,
    minimizer: [
      new CssMinimizerWebpackPlugin(),
    ],
  }
};