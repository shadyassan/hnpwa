const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const filename = (ext) =>
  isDev ? `[name].${ext}` : `[name].[fullhash].${ext}`;

const cssloaders = (extra) => {
  const loaders = ['style-loader', 'css-loader'];

  if (extra) {
    loaders.push(extra);
  }

  return loaders;
};

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: {
    main: './index.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: filename('js'),
  },
  devServer: {
    overlay: false,
    open: true,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/i,
        use: cssloaders(),
      },
      {
        test: /\.s[ac]ss/,
        use: cssloaders('sass-loader'),
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
  ],
};
