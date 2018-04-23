const path = require('path');

module.exports = {
  entry: './src/polyfill-css-has.ts',
  module: {
    rules: [
      {
        test: /\.js?$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  output: {
    filename: 'polyfill-css-has.js',
    path: path.resolve(__dirname, 'dist')
  }
};
