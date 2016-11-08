const path = require('path');
const express = require('express');
const webpack = require('webpack');

app.use(express.static(path.join(__dirname, '/static')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'static/index.html'));
});
const port = 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
