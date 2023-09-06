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
  res.status(statusCode).json({
    success: false,
    message: error.message,
  });
});

app.use((err, req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,PATCH,DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );     

  //Check sintax error in request
  if (err instanceof SyntaxError) {
    Logger.error(err);
    return ResponseGenerator.error(res,Status.REQUEST_ERROR,"JSON sended was bad formatted",Codes.Reporting.REQUEST_ERROR);
  }
  next();
});

app.listen(process.env.PORT, () =>
  console.log("> Listening at:", process.env.PORT)
);

console.log("DB", { name: process.env.DB_NAME });
module.exports = app;
