const { Pool } = require("pg");

const db = new Pool({
    user: 'postgres',
    password: 'postgres1234',
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT
})

module.exports = db;