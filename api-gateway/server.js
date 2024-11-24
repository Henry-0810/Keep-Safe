const express = require("express");
const proxy = require("express-http-proxy");
const cors = require("cors");
const app = express();
const port = 3001;

app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

// Update to use service names for Docker networking
app.use(
  "/auth",
  proxy("http://user-service:4000", {
    // Change localhost to user-service
    proxyReqPathResolver: (req) => {
      return `/api/user${req.url}`;
    },
  })
);

app.use(
  "/password",
  proxy("http://password-service:4001", {
    // Change localhost to password-service
    proxyReqPathResolver: (req) => {
      return `/api/password${req.url}`;
    },
  })
);

app.listen(port, () => {
  console.log(`API Gateway listening at http://localhost:${port}`);
});
