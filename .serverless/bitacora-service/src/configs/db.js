const { Pool } = require("pg");

//Local Test
const db = new Pool({
    user: "postgres",
    password: "postgres1234",
    database: "prueba",
    host: "localhost",
    port: 5432
});

/* const db = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT
}) */

module.exports = db;