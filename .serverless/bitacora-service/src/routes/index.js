const router = require("express").Router();

const authRoutes = require("./auth");
const memoriesRoutes = require("./memories");

module.exports = (db) => {
    router.use("/auth", authRoutes(db));
    router.use("/memories", memoriesRoutes(db));

    return router;
}