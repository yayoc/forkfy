const CommonConfig = require("./common.js");

const path = require("path");

module.exports = {
  context: CommonConfig.srcPath,
  target: "web",
  entry: "./client",
  output: {
    path: CommonConfig.distPath,
    filename: "client.js",
    publicPath: "/"
  },
  resolve: {
    modules: [path.resolve(__dirname, "../node_modules"), CommonConfig.srcPath],
    extensions: ["*", ".js", ".json"]
  },
  module: {
    rules: [CommonConfig.BabelLoaderRule, CommonConfig.CSSLoaderRule]
  },
  plugins: [CommonConfig.LocalStyles],
  devtool: "source-map",
  stats: CommonConfig.stats
};
