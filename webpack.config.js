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
  {id: 'about', title: 'О нас'},
  {id: 'catalog', title: 'Каталог'},
  {id: 'bacteriaList', title: 'Список бактерий'},
  {id: 'bacteria', title: 'Бактерия'},
  {id: 'services', title: 'Услуги центра'},
  {id: 'documents', title: 'Документы'},
  {id: 'publications', title: 'Публикации'},
  {id: 'news', title: 'Новости'},
  {id: 'article', title: 'Новость'},
  {id: 'contacts', title: 'Контакты'},
  {id: '404', title: 'Ошибка'},
]

const pageEntries = pages.map(page => page.id).reduce((config, pageId) => {
  config[pageId] = ['@babel/polyfill', path.resolve(__dirname, 'src', 'app', `${pageId}.js`)]
  return config
}, {
  app: ['@babel/polyfill', path.resolve(__dirname, 'src', 'app', `app.js`)]
})

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
    // chunkIds: 'named',
    splitChunks: {
      chunks: 'async',
    },
    runtimeChunk: 'single'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    filename: "[name].js",
    // assetModuleFilename: 'assets/[name][ext]'
  },
  plugins: [
    new MiniCssExtractPlugin({
      // filename: "[name].css",
      // chunkFilename: "[name].css",
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
      filename: `${page.id}.html`,
      template: path.resolve(__dirname, 'src', `views/${page.id}.hbs`),
      templateParameters:  Object.assign({
        menu: [
          {title: 'Каталог', link: '#select'},
          {title: 'О нас', link: 'about.html'},
          {title: 'Услуги центра', link: 'services.html'},
          {title: 'Документы', link: 'documents.html'},
          {title: 'Публикации', link: 'publications.html'},
          {title: 'Новости', link: 'news.html'},
          {title: 'Контакты', link: 'contacts.html'},
        ]
      }, page.data),
      minify: false,
      title: `${page.title} | КубГАУ - Сайт микроорганизмов`,
      chunks: ['app', page.id]
    })
  ))), module: {
    rules: [
      {
        test: /\.(handlebars|hbs)$/,
        use: [
          {
            loader: 'handlebars-loader',
            options: {
              helperDirs: path.resolve(__dirname, 'src/helpers'),
              partialDirs: path.resolve(__dirname, 'src/partials'),
            }
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
          // devMode == 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              url: false,
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
          
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                outputStyle: 'expanded'
              }
            }
          },
        ],
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
      // {
      //   test: /\.(woff|woff2|eot|ttf|otf)$/i,
      //   type: 'asset/resource',
      //   generator: {
      //     filename: 'fonts/[name].[ext]'
      //   }
      // },
    ]
  }
}