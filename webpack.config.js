const path = require("path");

module.exports = {
  entry: "./frontend/index.jsx",
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "./app/static/app"),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: { loader: "babel-loader" },
      },
    ],
  },
  resolve: {
    alias: {
      frontend: path.resolve(__dirname, "frontend"),
    },
    extensions: [".js", ".jsx"],
  },
};
