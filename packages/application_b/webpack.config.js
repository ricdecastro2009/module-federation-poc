const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const webpackCommon = require('../../webpack.common');

const port = 3002;

module.exports = {
    ...webpackCommon,
    devServer: {
      ...webpackCommon.devServer,
    port,
  },
  output: {
    publicPath: `http://localhost:${port}`, // New
  },
  /*optimization: {
    minimize: mode === 'production',
  },
  resolve: {
    extensions: ['.jsx', '.js', '.json', '.ts'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        //loader: require.resolve('babel-loader'),
        use: "ts-loader",
        options: {
          presets: [
            require.resolve('@babel/preset-react'),
            require.resolve('@babel/preset-typescript'),
          ],
        },
      },
    ],
  },*/

  plugins: [
    new ModuleFederationPlugin({
      name: 'application_b',
      library: { type: 'var', name: 'application_b' },
      filename: 'remoteEntry.js',
      exposes: {
        'SayHelloFromB': './src/app',
      },
      /*remotes: {
        'application_a': 'application_a',
      },*/
      shared: ['react', 'react-dom'],
    }),
    
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};