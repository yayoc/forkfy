const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ScriptExtHtmlWebpackPlugin = require("script-ext-html-webpack-plugin");

const path = require("path");

const IN_PRODUCTION = process.env.NODE_ENV === "production";
const srcPath = path.join(__dirname, "../src");
const distPath = path.join(__dirname, "../dist");

const HtmlPlugin = new HtmlWebpackPlugin({
  markup: "",
  template: "index.ejs",
  inject: true,
  production: IN_PRODUCTION,
  chunksSortMode: "dependency",
  minify: IN_PRODUCTION && {
    removeComments: true,
    collapseWhitespace: true,
    removeRedundantAttributes: true,
    useShortDoctype: true,
    removeEmptyAttributes: true,
    removeStyleLinkTypeAttributes: true,
    keepClosingSlash: true,
    minifyJS: true,
    minifyCSS: true,
    minifyURLs: true
  }
});

const ScriptExtHtmlPlugin = new ScriptExtHtmlWebpackPlugin({
  defaultAttribute: "async"
});

const LocalStyles = new ExtractTextPlugin({
  filename: "client.css",
  allChunks: true
});

const CSSLoader = LocalStyles.extract({
  fallback: "style-loader",
  use: [
    {
      loader: "css-loader",
      options: {
        module: true, // css-loader 0.14.5 compatible
        modules: true,
        localIdentName: "[hash:base64:5]"
      }
    },
    {
      loader: "sass-loader",
      options: {
        outputStyle: "collapsed",
        sourceMap: true,
        includePaths: [srcPath]
      }
    }
  ]
});

const CSSLoaderRule = {
  test: /\.(scss|css)$/,
  use: CSSLoader
};

const IsomorphicStyleLoaderRule = {
  test: /\.(scss|css)$/,
  use: [
    "isomorphic-style-loader",
    {
      loader: "css-loader",
      options: {
        importLoaders: 1
      }
    },
    "postcss-loader"
  ]
};

const BabelLoaderRule = {
  test: /\.(js|jsx)$/,
  exclude: /node_modules/,
  use: {
    loader: "babel-loader",
    options: {
      cacheDirectory: true
    }
  }
};

const stats = {
  assets: true,
  children: false,
  chunks: false,
  hash: false,
  modules: false,
  publicPath: false,
  timings: true,
  version: false,
  warnings: true,
  colors: {
    green: "\u001b[32m"
  }
};

module.exports = {
  srcPath,
  distPath,
  HtmlPlugin,
  ScriptExtHtmlPlugin,
  LocalStyles,
  IsomorphicStyleLoaderRule,
  CSSLoaderRule,
  BabelLoaderRule,
  stats
};
