const path = require("path")
const dotenv = require("dotenv-webpack")
const dotenvPlugin = new dotenv({ path: path.resolve(__dirname, '../.env') })
const htmlWebPackPlugin = require("html-webpack-plugin")
const htmlPlugin = new htmlWebPackPlugin({
  template: path.resolve(__dirname, "./app/index.html"), // Location of source index.html
  filename: "index.html", // Name of produced index.html,
  chunksSortMode: "dependency" //Allows to control how chunks should be sorted before they are included to the html
})
// const copyWebpackPlugin = require("copy-webpack-plugin")
// const copyPlugin = new copyWebpackPlugin(
//   [
//     {
//       from: path.resolve(__dirname, "app/assets/images/"),
//       to: path.resolve(__dirname, "dist/assets/images/")
//     },
//     {
//       from: path.resolve(__dirname, "app/assets/fonts"),
//       to: path.resolve(__dirname, "dist/assets/fonts")
//     },
//     {
//       from: path.resolve(__dirname, "app/assets/various"),
//       to: path.resolve(__dirname, "dist/assets/various")
//     }
//   ],
//   {}
// )  Manual copy of assets to avoid importing in evey component (not optimal for Webpack)

const webpackDevConfig = {
  mode: "development",
  entry: {
    // We are telling webpack that we would like separate dependency graphs for each file here
    // optimally, there should be 1 file for each page of the app
    main: [
      '@babel/polyfill', // polyfill for Webpack 4 to use regenerators, Object.assign etc
      path.resolve(__dirname, "app")
    ]
  },
  // we can produce a custom output bundle but this is optional since we use webpack-dev-server
  // on development  that handles files in-memory
  // output: {
  //   path: path.resolve(__dirname, "dist"),
  //   filename: "main.js"
  // },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          { loader: "babel-loader" },
          { loader: "eslint-loader" }
        ]
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true }
          }
        ]
      },
      {
        test: /\.scss$/,
        loaders: [
          "style-loader", // creates style nodes from JS strings
          "css-loader", // translates CSS into CommonJS
          "postcss-loader", // uses plugins defined in postcss.config.js , most important is autoprefixer
          "sass-loader" // compiles Sass to CSS
          // these loader arrays work bottom to top
        ]
      },
      {
        test: /\.css$/,
        loaders: ["style-loader", "postcss-loader", "css-loader"]
      },
      {
        test: /\.(png|jp(e*)g)$/,
        loader: 'image-webpack-loader',
        enforce: 'pre'
      },
      {
        test: /\.(png|jp(e*)g)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "assets/images/",
              limit: 10 * 1024
              // inlining files below 10kB
              // → If image.png is smaller than 10 kB, `imageUrl` will include
              // the encoded base64 image: 'data:image/png;base64,iVBORw0KGg…'
              // → If image.png is larger than 10 kB, the loader will create a new file,
              // and `imageUrl` will include its url: `/2fcd56a1920be.png`
            }
          }
        ] // dynamic loading of imported images
      },
      {
        test: /\.svg$/,
        loader: 'svg-url-loader',
        options: {
          limit: 10 * 1024,
          // Remove the quotes from the url
          // (they’re unnecessary in most cases)
          noquotes: true
          // svg-url-loader works like url-loader – except it encodes files with the URL encoding. T  his is more size-effective
        }
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "assets/fonts/"
            }
          }
        ] // dynamic loading of imported fonts
      }
    ]
  },
  plugins: [
    htmlPlugin,
    // copyPlugin,
    dotenvPlugin
  ],
  stats: {
    colors: true
  },
  devtool: 'source-map', // Create Sourcemaps for the bundle
  resolve: {
    modules: [path.resolve("./app"), path.resolve("./node_modules")]
  }, // Path resolver to make relative imports available (assets/images instead of ../assets/images)
  devServer: {
    port: 8003
  } // Port webpack serves to
}

module.exports = webpackDevConfig
