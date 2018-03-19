const webpack = require('webpack');

module.exports = {
  entry: 
  {
    app:'./src/app',
    login: './src/login'
  },
  output: {
    path: __dirname + '/dist',
    filename: '[name]/[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader",
      }
    ]
  }
  ,devtool: 'eval-source-map' 
}
