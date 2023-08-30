const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const ExternalTemplateRemotesPlugin = require('external-remotes-plugin');
const path = require('path');

module.exports = {
  entry: './src/index',
  mode: 'development',
  devServer: {
    static: path.join(__dirname, 'dist'),
    port: 3001,
  },
  output: {
    publicPath: 'auto',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-react'],
        },
      },
      {
        test: /\.css$/i,
        use: [
          {
            loader: 'style-loader',
            options: {
              insert: function insertAtShadowRoot(element) {
                parent = document.getElementById('root').shadowRoot;
                parent.appendChild(element);
              },
            },
          },
          'css-loader',
        ],
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'app1',
      remotes: {
        app2: 'app2@[app2Url]/remoteEntry.js',
      },
      shared: { react: { singleton: true }, 'react-dom': { singleton: true } },
    }),
    new ExternalTemplateRemotesPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};
