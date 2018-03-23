const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractCSS = new ExtractTextPlugin('[name].css');
let moduleWorks = 'catalogos';

module.exports = {
  entry: {
    //"Acciones":['babel-polyfill', path.resolve(__dirname, 'src/entries/catalogos/acciones/acciones.js')],
    "Caracteres":['babel-polyfill', path.resolve(__dirname, 'src/Entries/Catalogos/Caracteres/index.js')],
    //"subTipos":['babel-polyfill', path.resolve(__dirname, 'src/entries/catalogos/subTipos/subTipos.js')],
    //"Textos":['babel-polyfill', path.resolve(__dirname, 'src/entries/catalogos/textos/textos.js')],


    //formularios insert
    //"subTipos":['babel-polyfill', path.resolve(__dirname, 'src/entries/catalogos/subTipos/create.js')],

  },
  output: {
    path: path.resolve(__dirname, '../public/'),
    filename: `js/[name]/[name].js`
  },
  devServer: {
    port: 9000,
  },
  module: {
    rules: [
      {
        // test: que tipo de archivo quiero reconocer,
        // use: que loader se va a encargar del archivo
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'react', 'stage-2'],
            plugins:['transform-async-to-generator']
          }
        },
      },
      {
        test: /\.styl$/,
        loader:'style-loader!css-loader!stylus-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(jpg|png|gif|svg)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 1000000,
            fallback: 'file-loader',
            name: 'images/[name].[hash].[ext]',
          }
        }
      },
    ]
  },
  plugins: [extractCSS],
}
