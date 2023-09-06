const { Pool } = require("pg");

process.env.PGSSLMODE = 'no-verify';

const db = new Pool({
    user: 'postgres',
    password: 'postgres1234',
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT)
})

module.exports = db;