const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')

const MODE = process.env.NODE_ENV || 'development'

const enabledSourceMap = MODE === 'development'

module.exports = {
  mode: MODE,
  devtool: 'source-map',
  entry: './src/index.js',
  output: {
    filename: 'assets/js/app.js',
    path: path.join(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.ejs$/,
        use: [
          {
            loader: "html-loader",
            options: {
              sources: false,
            },
          },
          {
            loader: "ejs-plain-loader",
          },
        ],
      },
      {
        test: /\.scss/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              url: true,
              sourceMap: enabledSourceMap,
              importLoaders: 2
            }
          },
          {
            loader: 'postcss-loader',
            options: {
            　postcssOptions: {
              sourceMap: enabledSourceMap,
        　    plugins: [
              require('autoprefixer')({
               grid: true,
　　　　　      }),
    　　    　]
            }
           }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: enabledSourceMap,
              implementation: require('sass'),
              sassOptions: {
                fiber: false,
              },
            }
          }
        ]
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
                // プリセットを指定することで、ES2020 を ES5 に変換
                '@babel/preset-env'
            ]
          }
        }
      }
    ]
  },
  // ES5(IE11等)向けの指定（webpack 5以上で必要）
  target: [
    "web",
    "es5"
  ],
  plugins: [
    new HtmlWebpackPlugin({
      hash: true,
      template: './src/index.ejs',
      filename: 'index.html'
    }),
    new MiniCssExtractPlugin({
      filename: 'assets/css/app.css'
    }),
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 3000,
      server: {
        baseDir: ['dist']
      }
    })
  ]
};
