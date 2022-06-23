const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();
const port = process.env.PORT || 80;

console.log(`Port: ${port}...`);

app.use(
  '/api',
  createProxyMiddleware({
    target: 'https://geospree-services-stage.herokuapp.com/api',
    changeOrigin: true,
    pathRewrite: { '^/api': '' }
  })
);

console.log('Starting carat portal proxy server');
app.listen(port);
