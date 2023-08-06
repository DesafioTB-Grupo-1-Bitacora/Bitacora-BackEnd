require("dotenv").config();
const express = require("express");
const { db } = require("./configs");
const errors = require("./misc/errors");
const routes = require("./routes");

const app = express();
app.use(express.json());
app.use('/bitacora-service', routes(db));

app.use((_, __, next) => {
    next(errors[404])
})

app.use(({ statusCode, error }, _, res, __) => {
    res.status(statusCode).json({
        success: false,
        message: error.message,
    })
})

app.listen(process.env.PORT, () => console.log("> Listening at:", process.env.PORT));

module.exports = app;