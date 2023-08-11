const { sql } = require("slonik")

const insertUser = (email, username, password) => {
    return {
        text: "INSERT INTO users (email, username, password) VALUES ($1, $2, $3)",
        values: [email, username, password]
    }
} 

const selectByEmail = (email) => {
    return {
        text: "SELECT email, username, password FROM users WHERE email LIKE $1",
        values: [email]
    }
}

module.exports = {
    insertUser,
    selectByEmail
}