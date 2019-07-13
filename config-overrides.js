const path = require('path');
const paths = require('react-scripts/config/paths');
const publicPath = paths.servedPath;
//const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

paths.formiojs = paths.appSrc + '/formiojs/index.js';
//paths.appHtml = paths.appPublic + '/index.html';
paths.authoring = paths.appSrc + '/index.js';


module.exports = function override(config, env) {
  const isEnvProduction = env === 'production';

  if (isEnvProduction) {
    const plugins =  config.plugins.filter(plg => plg.constructor.name !== 'MiniCssExtractPlugin');
    plugins.push(new MiniCssExtractPlugin({
      filename: 'static/css/[name].css',
      chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
    }));
    config.plugins = plugins;
  }

  config.entry = {
    authoring: paths.authoring,
    formio: paths.formiojs
  };

  config.output = {
    path: paths.appBuild,
    // pathinfo: true,
    filename: 'static/js/[name].bundle.js',
    chunkFilename: 'static/js/[name].chunk.js',
    publicPath: publicPath,
    // devtoolModuleFilenameTemplate: info =>
    //   path.resolve(info.absoluteResourcePath),
  };

  // const htmlTemplates = {
  //   member: paths.appHtml,
  // };

  config.optimization = {
    splitChunks: {
      chunks: 'async'
    }
  };

  return config;
};

