const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './client/src/main.tsx', // Ensure this is your correct entry file
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'], // Add .ts and .tsx to the list of resolved extensions
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/, // This regex will match both .ts and .tsx files
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'] // Adding TypeScript preset
          }
        }
      },
      {
      // Updated regex to include .ico files
      test: /\.(png|svg|jpg|jpeg|gif|ico)$/i,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]',
          },
        },
      ],
    },
      {
        test: /\.css$/, // Targets only CSS files
        use: [
          'style-loader', // Injects CSS into the DOM via a <style> tag
          'css-loader',   // Turns CSS into CommonJS
          'postcss-loader' // Processes CSS with PostCSS
        ]
      }
    ]
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 8080, // You can use any port you prefer
    open: true, // Open the browser after server had been started
    historyApiFallback: true,
    host: '0.0.0.0',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './client/index.html' // Ensure this points to your HTML entry file
    })
  ]


};
