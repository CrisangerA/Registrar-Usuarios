const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const devMode = process.env.NODE_ENV;

module.exports = {
  entry: "./frontend/Index.jsx",
  output: {
    path: path.join(__dirname, "backend/public"),
    filename: "js/bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "frontend/index.html",
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeScriptTypeAttributes: true,
        useShortDoctype: true
      }
    })
  ],
  mode: devMode,
  devtool: "source-map"
};
