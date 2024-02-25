const path = require('path')

module.exports = {
  devServer: {
    port: 3000
  },
  // webpack setting
  webpack: {
    // set alias
    alias: {
      // use @ to represent the src folder
      '@': path.resolve(__dirname, 'src')
    }
  }
}