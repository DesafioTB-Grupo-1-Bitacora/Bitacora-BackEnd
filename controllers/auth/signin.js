//const { hash, serialize } = require("simple-stateless-auth-library");
const { selectUser } = require("../../models/auth");
const errors = require("../../misc/errors");
const { serializeToken } = require("../../misc/authUtils");

module.exports = (db) => async (req, res, next) => {
    const { email, password } = req.body;

    const response = await selectUser(await db)(email, password);

    if(!response.ok) return next(errors[response.error_code || 500]);

    serializeToken(res, response.content);

    res.status(200).json({
        success: true,
    })
}