const merge = require("webpack-merge")
const path = require("path")

const devConfig = require("./webpack.dev.config")

const uglifyWebpackPlugin = require("uglifyjs-webpack-plugin")

// Webpack configuration for production with optimizations

// Custom uglify rules, enabling sourceMap and removing console.logs & errors
const uglifyWebpack = new uglifyWebpackPlugin({
  sourceMap: true,
  parallel: true,
  uglifyOptions: {
    compress: {
      drop_console: true
    }
  }
})

const webpackProdConfig = merge(devConfig, {
  mode: "production",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[chunkhash].js" // filenames are generated at runtime. It invalidates the bundle when value for any chunk changes. Helps with caching
  },
  optimization: {
    minimize: true,
    minimizer: [uglifyWebpack],
    // runtimeChunk: true adds an extra chunk to each entrypoint containing only the runtime. Here we are not interested in that, so we simply turned it off.
    runtimeChunk: false,
    // assigns modules to cache groups. Basically, we are assigning all modules from node_modules that are duplicated in at least 2 chunks to a cache group called vendor_app. This helps us to extract out common chunks into a specific file (vendor_app.js). In production, that file will download once and will be cached; so later the cached version could be used
    splitChunks: {
      cacheGroups: {
        default: false,
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendor_app",
          chunks: "all",
          minChunks: 2
        }
      }
    }
  }
})

module.exports = webpackProdConfig
