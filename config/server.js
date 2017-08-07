const CommonConfig = require("./common.js");

const nodeExternals = require("webpack-node-externals");
const path = require("path");

module.exports = {
  context: CommonConfig.srcPath,
  target: "node",
  entry: "./server",
  output: {
    path: CommonConfig.distPath,
    filename: "server.js"
  },
  node: {
    __dirname: false,
    __filename: false
  },
  resolve: {
    modules: [path.resolve(__dirname, "../node_modules"), CommonConfig.srcPath],
    extensions: ["*", ".js", ".json"]
  },
  module: {
    rules: [
      CommonConfig.BabelLoaderRule,
      CommonConfig.IsomorphicStyleLoaderRule
    ]
  },
  externals: nodeExternals(),
  devtool: "source-map",
  stats: CommonConfig.stats
};
