const path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin');

const htmlPlugin = new HtmlWebpackPlugin({
  template: "./index.html",
  filename: "./index.html"
});

module.exports = {
  entry: './src/index.js',
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, '/'),
    filename: 'index_bundle.js',
    publicPath: '/'
  },
  devServer: {
    historyApiFallback: true,
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  plugins: [htmlPlugin]
};