const DirectoryNamedWebpackPlugin = require('directory-named-webpack-plugin');
const customConfig = require('./next.custom.js');

module.exports = {
  ...customConfig,
  webpack(config) {
    config.resolve.plugins.push(new DirectoryNamedWebpackPlugin());
    return config;
  }
};