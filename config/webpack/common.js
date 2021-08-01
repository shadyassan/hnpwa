const paths = require('../paths');
const webpack = require('webpack');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const Dotenv = require('dotenv-webpack');

const babelLoader = {
  loader: 'babel-loader',
  options: {
    presets: ['@babel/preset-env', '@babel/preset-react'],
    plugins: [
      '@babel/plugin-syntax-dynamic-import',
      '@babel/plugin-proposal-class-properties',
    ],
  },
};

module.exports = {
  entry: `${paths.src}/index.js`,
  output: {
    path: paths.build,
    filename: 'js/[name].bundle.js',
    publicPath: '/',
    clean: true,
    crossOriginLoading: 'anonymous',
    module: true,
    environment: {
      arrowFunction: true,
      bigIntLiteral: false,
      const: true,
      destructuring: true,
      dynamicImport: false,
      forOf: true,
    },
  },
  resolve: {
    alias: {
      '@': `${paths.src}/modules`,
      '~': `${paths.src}/pages`,
    },
    extensions: ['.js', '.jsx', '.json'],
  },
  experiments: {
    topLevelAwait: true,
    outputModule: true,
  },
  module: {
    rules: [
      {
        test: /\.m?jsx?$/i,
        exclude: /node_modules/,
        use: babelLoader,
      },
      {
        test: /\.(c|sa|sc)ss$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { importLoaders: 1 },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.md$/,
        use: ['html-loader', 'markdown-loader'],
      },
      {
        test: /\.(jpe?g|png|gif|svg|eot|ttf|woff2?)$/i,
        type: 'asset',
      },
    ],
  },
  plugins: [
    new webpack.ProgressPlugin(),

    new CopyWebpackPlugin({
      patterns: [
        {
          from: `${paths.public}/assets`,
        },
      ],
    }),

    new HtmlWebpackPlugin({
      template: `${paths.public}/index.html`,
      filename: 'index.html',
      templateParameters: {
        analytics: 'Google Analytics ID',
        author: 'Shady',
        publishedDate: '2021-04-10',
        description: 'react_test_task',
        keywords: 'webpack, react, template',
        title: 'react_test_task',
        url: 'https://github.com/shadyassan/react_test_task',
      },
    }),

    new webpack.ProvidePlugin({
      React: 'react',
    }),

    new Dotenv({
      path: './config/.env',
    }),
  ],
};
