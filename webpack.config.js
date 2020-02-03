const path = require('path');
const {
  NODE_ENV = 'development',
  // NODE_ENV = 'production'
} = process.env;

module.exports = {
  entry: './server/index.ts',
  mode: NODE_ENV,
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'index.js',
    pathinfo: true
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          'ts-loader',
        ]
      }
    ]
  },
  optimization: {
    // minimizer: [new UglifyJsPlugin()],
    usedExports: true,
    sideEffects: true
  },
}