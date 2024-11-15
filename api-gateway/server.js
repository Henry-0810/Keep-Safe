const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();
const PORT = 3001;

app.use(
  "/api/user",
  createProxyMiddleware({ target: "http://localhost:4000", changeOrigin: true })
);

app.use(
  "/api/password-service",
  createProxyMiddleware({ target: "http://localhost:4001", changeOrigin: true })
);

app.listen(PORT, () => {
  console.log(`API Gateway (Proxy) listening at http://localhost:${PORT}`);
});
