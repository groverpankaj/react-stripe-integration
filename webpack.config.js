const path = require('path');
const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');

const CLIENT_SRC_DIR = path.join(__dirname, '/client/src');
const CLIENT_DIST_DIR = path.join(__dirname, '/client/dist');

const browserConfig = {
  mode: 'development',
  entry: `${CLIENT_SRC_DIR}/index.js`,
  output: {
    filename: 'bundle.js',
    path: CLIENT_DIST_DIR,
  },
  module: {
    rules: [
      {
        test: /(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true,
            },
          },
        ],
        include: /.module.css$/,
      },
      {
        test: /.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
        exclude: /.module.css$/,
      },
      {
        test: /.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
        ],
      },
      {
        test: /.(eot|woff2|.ttf|.woff|.svg)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      __isBrowser__: 'true',
    }),
    new Dotenv(),
  ],
};

const SERVER_SRC_DIR = path.join(__dirname, '/server');
const SERVER_DIST_DIR = path.join(__dirname, '/server-build');

const serverConfig = {
  mode: 'development',
  target: 'node',
  externals: [nodeExternals()],
  entry: `${SERVER_SRC_DIR}/index.js`,
  output: {
    filename: 'index.js',
    path: SERVER_DIST_DIR,
  },
  module: {
    rules: [
      {
        test: /(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true,
            },
          },
        ],
        include: /.module.css$/,
      },
      {
        test: /.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
        exclude: /.module.css$/,
      },
      {
        test: /.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
        ],
      },
      {
        test: /.(eot|woff2|.ttf|.woff|.svg)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      __isBrowser__: 'false',
    }),
    new Dotenv(),
  ],
};

module.exports = [browserConfig, serverConfig];
