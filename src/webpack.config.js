const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    core: './core/index.ts',
    infrastructure: './infrastructure/console/index.ts',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
    fallback: {
      crypto: require.resolve('crypto-browserify'),
      async_hooks: require.resolve('async_hooks'),
      zlib: require.resolve('browserify-zlib'),
      querystring: require.resolve('querystring-es3'),
      path: require.resolve('path-browserify'),
      stream: require.resolve('stream-browserify'),
      http: require.resolve('stream-http'),
      os: require.resolve('os-browserify'),
      assert: require.resolve('assert/'),
      fs: false,
      net: false,
      vm: require.resolve('vm-browserify'),
      tty: require.resolve('tty-browserify'),
      child_process: false,
      readline: false
    },
  },
  devServer: {
    contentBase: './dist',
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
};
