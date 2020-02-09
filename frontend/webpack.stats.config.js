// extra webpack config to provide build stats
const prodConfig = require("./webpack.prod.config")
const path = require("path")
const WebpackMonitor = require("webpack-monitor")
const WebpackBundleSizeAnalyzerPlugin = require("webpack-bundle-size-analyzer")
  .WebpackBundleSizeAnalyzerPlugin
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin

prodConfig.plugins.push(
  new WebpackBundleSizeAnalyzerPlugin(
    path.resolve(__dirname, "dist/build_stats/bundle_size_analyzer.txt")
  ),
  new WebpackMonitor({
    capture: true,
    launch: true,
    target: path.resolve(
      __dirname,
      "dist/build_stats/webpack_monitor_stats.json"
    ),
    port: 8090
  }),
  new BundleAnalyzerPlugin({ analyzerPort: 8889 })
)

module.exports = prodConfig
