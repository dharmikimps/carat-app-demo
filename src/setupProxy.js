const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      // target: 'https://geospree-services-stage.herokuapp.com/api',
      target: 'http://localhost:4000/api',
      changeOrigin: true,
      pathRewrite: { '^/api': '' }
    })
  );
};
