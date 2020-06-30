/* eslint-disable */
const path = require('path');

module.exports = {
  entry: './src/index.js',
  resolve: {extensions: ['.js','.jsx']},
  output: {
    path: path.join(__dirname, '../html/public/js'),
    filename: 'index_bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: [/node_modules/, /sqlMiddleware/],
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'babel-preset-react'],
        },
      },
    ],
  }
};
