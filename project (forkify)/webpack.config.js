const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: ["./src/js/index.js"],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/bundle.js",
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, "dist"),
    },
    compress: true,
    port: 9000,
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/index.html",
    }),
  ],
  mode: "development",
};
