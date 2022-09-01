const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackDevServerConfig = require('../build/webpack.dev.config');
const app = express();
const compiler = webpack(webpackDevServerConfig);

app.use(webpackDevMiddleware(compiler, {
  stats: {
    colors: true,
  },
}));

app.listen(3000, () => {
  console.log('your application is running on localhost:3000');
});