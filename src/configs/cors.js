const errors = require("../misc/errors");
const WHITELIST = ["localhost","127.0.0.1"];

module.exports = {
    origin: (origin, callback) => {
        if(!origin) return callback(null, true);

        const match = WHITELIST.find((domain) => origin.includes(domain));

        match ? callback(null, true) : callback(errors["cors"]);
    },

    credentials: true
}