const path     = require('path')
const webpack  = require('webpack')
const wds_port = 3000

const PATHS = {
  src: path.join(__dirname, 'src'),
  js: path.join(__dirname, 'src/js'),
  build: path.join(__dirname, 'dist'),
  devServer: path.join(__dirname, 'dev-server'),
}

console.log('Webpack running with environment: ', process.env.NODE_ENV)

// default environment to production if not set
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'production'
}

//environment specific config
let includes    = [PATHS.js]
let devtool     = false
let output_path = PATHS.build
let entrypoint  = PATHS.js + '/index.js'
let plugins     = [new webpack.EnvironmentPlugin(['NODE_ENV'])]

if (process.env.NODE_ENV == 'development') {
  includes.push(PATHS.devServer)
  devtool     = 'eval-source-map'
  output_path = PATHS.devServer + '/dist'
  entrypoint  = PATHS.devServer + '/src/dev-server.js'
  plugins.push(new webpack.HotModuleReplacementPlugin())
}

let config = {
  // entrypoint to build output
  entry: [entrypoint],
  externals: {
    'cheerio': 'window',
      react: {
        root: 'React',
        commonjs2: 'react',
        commonjs: 'react',
        amd: 'react',
        umd: 'react'
      },
      'react-dom': {
        root: 'ReactDOM',
        commonjs2: 'react-dom',
        commonjs: 'react-dom',
        amd: 'react-dom',
        umd: 'react-dom'
      },
  },
  devServer: {
    host: '0.0.0.0',
    port: wds_port,
    hot: true,
    inline: true,
    historyApiFallback: true,
    contentBase: PATHS.devServer + '/dist'
  },
  output: {
    path: output_path,
    filename: 'main.js',
    library: 'anythingYouWant',
    libraryTarget: 'umd'
  },
  plugins: plugins,
  resolve: {
    extensions: [".js", ".json", ".css", ".scss"]
  },
  devtool: devtool,
  module: {
    rules: [
      {
        // images and fonts
        test: /\.(ttf|png|jpe?g|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
        use: [
          {
            loader: 'file-loader'
          }
        ]
      },
      {
        test: /\.jsx?$/,
        use: [
          {
            loader: 'babel-loader'
          }
        ],
        include: includes
      },
      {
        test: /\.s?css$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader"
          },
          {
            loader: "sass-loader"
          }
        ]
      }
    ]
  }
};

module.exports = config