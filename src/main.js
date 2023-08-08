require("dotenv").config();
const express = require("express");
const { db } = require("./configs");
const errors = require("./misc/errors");
const routes = require("./routes");

const app = express();

app.use((req, res, next) => {
  res.setHeader(
    "Strict-Transport-Security",
    "max-age=63072000; includeSubDomains"
  );
  res.setHeader("Content-Security-Policy", "default-src 'self'");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("X-XSS-Protection", "1; mode=block");
  res.setHeader("X-Content-Type-Options", "nosniff");
  next();
});

app.use(express.json());
app.use("/bitacora-service", routes(db));

app.use((_, __, next) => {
  next(errors[404]);
});

app.use(({ statusCode, error }, _, res, __) => {
  res.status(statusCode).json({
    success: false,
    message: error.message,
  });
});

app.listen(process.env.PORT, () =>
  console.log("> Listening at:", process.env.PORT)
);

console.log("DB", { name: process.env.DB_NAME });
module.exports = app;
