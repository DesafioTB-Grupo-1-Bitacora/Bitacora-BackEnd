require("dotenv").config();
const express = require("express");
const multer = require("multer");
const { db } = require("./configs");
const cookieParser = require("cookie-parser");
const errors = require("./misc/errors");
const routes = require("./routes");

const app = express();

const storage = multer.memoryStorage();
const upload = multer({ storage });

app.use(express.json());
app.use(cookieParser());
app.use(upload.any());

app.use("/bitacora-service", routes(db));

app.use((_, __, next) => {
  next(errors[404]);
});

app.use(({ statusCode, error }, _, res, __) => {
  res.header('Access-Control-Allow-Origin', '*');  

  res.status(statusCode).json({
    success: false,
    message: error.message,
  });
});

app.listen(process.env.PORT, () =>
  console.log("> Listening at:", process.env.PORT)
);

module.exports = app;
