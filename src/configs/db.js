const { Pool } = require("pg");
const { getSecret } = require('./secrets')

process.env.PGSSLMODE = 'no-verify';

const db = new Promise(function (resolve, reject) {
    getSecret('bitacora-rds-dev')
    .then((result) => {
        const {username, password } = JSON.parse(result);

        const dbConfig = new Pool({
            user: username,
            password,
            database: process.env.DB_NAME,
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT)
        })

        resolve(dbConfig)
    })
    .catch((err) => {
        reject(err)
    })
});

module.exports = db;

