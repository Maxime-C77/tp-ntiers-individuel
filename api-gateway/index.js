
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();
const cors = require('cors');

app.use(cors());

app.use('/api/users', createProxyMiddleware({ target: 'http://localhost:4001', changeOrigin: true }));
app.use('/api/publications', createProxyMiddleware({ target: 'http://localhost:4002', changeOrigin: true }));

app.listen(4000, () => console.log('API Gateway running on port 4000'));
