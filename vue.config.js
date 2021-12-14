module.exports = {
  lintOnSave: false,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://39.98.123.211',
        changeOrigin: true,
        // pathRewrite: { '^/api': '' }
      }
    }
  },
  productionSourceMap: false
}