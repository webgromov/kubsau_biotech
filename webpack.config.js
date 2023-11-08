const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const mode = process.env.NODE_ENV || 'development'

const devMode = mode === 'development'
const target = devMode ? 'web' : 'browserslist'
const devtool = devMode ? 'source-map' : undefined

const pages = [
  {id: 'index', title: 'Главная'},
]

const pageEntries = pages.map(page => page.id).reduce((config, page) => {
  config[page] = ['@babel/polyfill', path.resolve(__dirname, 'src', 'app', `${page}.js`)]
  return config
}, {})

module.exports = {
  mode,
  target,
  devtool,
  devServer: {
    port: 3000,
    hot: true
  },
  entry: pageEntries,
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    filename: "[name].js",
    assetModuleFilename: 'assets/[name][ext]'
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src', 'img'),
          to: path.resolve(__dirname, 'dist', 'assets/img')
        }
      ]
    })
  ]
  .concat(pages.map(page => (
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'views', `${page.id}.hbs`),
      title: `${page.title} | КубГАУ - Сайт микроорганизмов`,
      filename: `${page.id}.html`
    })
  ))),
  module: {
    rules: [
      {
        test: /\.hbs$/,
        use: [
          {
            loader: 'handlebars-loader'
          }
        ]
      },
      {
        test: /\.html$/i,
        loader: 'html-loader'
      },
      {
        test: /\.(c|sc|sa)ss$/i,
        use: [
          devMode == 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,

          {
            loader: 'css-loader',
            options: {
              url: false
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [require('postcss-preset-env')]
              }
            }
          },
          
          'sass-loader',
        ]
      },
      {
        test: /\.(?:js|mjs|cjs)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: "defaults" }]
            ]
          }
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name].[ext]'
        }
      },
    ]
  }
}