const CommonConfig = require("./common.js");

const path = require("path");

module.exports = {
  context: CommonConfig.srcPath,
  target: "web",
  entry: "./client/client.tsx",
  output: {
    path: CommonConfig.distPath,
    filename: "client.js",
    publicPath: "/"
  },
  resolve: {
    modules: [path.resolve(__dirname, "../node_modules"), CommonConfig.srcPath],
    extensions: ["*", ".js", ".json", ".ts", ".tsx"]
  },
  module: {
    rules: [
      CommonConfig.BabelLoaderRule,
      CommonConfig.CSSLoaderRule,
      {
        test: /\.js$/,
        enforce: "pre",
        loader: "source-map-loader"
      },
      { test: /\.tsx?$/, loader: "awesome-typescript-loader" }
    ]
  },
  plugins: [
    CommonConfig.LocalStyles,
    CommonConfig.DefinePlugin,
    CommonConfig.UglifyPlugin
  ],
  devtool: "source-map",
  stats: CommonConfig.stats
};
