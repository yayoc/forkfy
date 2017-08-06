const path = require("path");

const srcPath = path.join(__dirname, "../src");
const distPath = path.join(__dirname, "../dist");

module.exports = {
  context: srcPath,
  target: "web",
  entry: "./client",
  output: {
    path: distPath,
    filename: "client.js",
    publicPath: "/"
  },
  resolve: {
    modules: [path.resolve(__dirname, "../node_modules"), srcPath],
    extensions: ["*", ".js", ".json"]
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true
          }
        }
      }
    ]
  },
  devtool: "source-map",
  stats: {
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
  }
};
