const path = require('path');
const webpack = require('webpack')
const slsw = require('serverless-webpack')
const TerserPlugin = require('terser-webpack-plugin');

const entries = slsw.lib.entries
const isLocal = Object.keys(entries).length === 0
const localEntry = {
  main: './src/main.js'
}

module.exports = {
  entry: isLocal ? localEntry : entries,
  mode: isLocal ? 'none' : 'production',
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          keep_classnames: true,
        },
      }),
    ],
  },
  target: 'node',
  devtool: 'source-map',
  module: {
    rules: [],
  },
  resolve: {
    extensions: ['.js'],
    symlinks: false,
  },
  plugins: [
    new webpack.IgnorePlugin({ resourceRegExp: /^pg-native$/ }),
    new webpack.IgnorePlugin({
      checkResource(resource) {
        const lazyImports = [
          'cache-manager'
        ];
        if (!lazyImports.includes(resource)) {
          return false;
        }
        try {
          require.resolve(resource, {
            paths: [process.cwd()],
          });
        } catch (err) {
          return true;
        }
        return false;
      },
    })
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    libraryTarget: 'commonjs',
    clean: true,
  }
}


