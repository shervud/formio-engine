const path = require('path');
const paths = require('react-scripts/config/paths');
const publicPath = paths.servedPath;
//const HtmlWebpackPlugin = require('html-webpack-plugin');


paths.formiojs = paths.appSrc + '/formiojs/index.js';
//paths.appHtml = paths.appPublic + '/index.html';
paths.authoringApp = paths.appSrc + '/index.js';


module.exports = function override(config, env) {

  config.entry = {
    authoringApp: paths.authoringApp
    //formio: paths.formiojs
  };

  config.output = {
    path: paths.appBuild,
    // pathinfo: true,
    filename: 'static/js/[name].bundle.js',
    //chunkFilename: 'static/js/[name].chunk.js',
    publicPath: publicPath,
    // devtoolModuleFilenameTemplate: info =>
    //   path.resolve(info.absoluteResourcePath),
  };

  // const htmlTemplates = {
  //   member: paths.appHtml,
  // };

  config.optimization = {
    splitChunks: {
      chunks: 'all'
    }
  };

  return config;
};

