process.env.ENV = process.env.ENV || 'dev';
const path = require('path');
const express = require('express');
const webpack = require('webpack');
const wpMiddleWare = require('webpack-dev-middleware');
const wpHotMiddleWare = require('webpack-hot-middleware');
const config = require('./webpack.config.js');
const app = require('./app/app.js');

if (process.env.ENV === 'dev') {
  const compiler = webpack(config);
  const midWare = wpMiddleWare(compiler, {
    stats: {
      colors: true,
      chunks: false,
    },
  });
  app.use(midWare);
  app.use(wpHotMiddleWare(compiler));
}
app.use(express.static(path.join(__dirname, '/src/static')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/src/static/index.html'));
});
const port = 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
