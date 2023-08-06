const { createUser } = require("../../models/auth");
const errors = require("../../misc/errors");
const { hashPass } = require("../../misc/authUtils");

module.exports = (db) => async (req, res, next) => {
    const { email, username, password } = req.body;

    const encryptedPassword = hashPass(password);

    const response = await createUser(await db)(email, username, encryptedPassword);

    if(!response.ok) return next(errors[500]);

    res.status(200).json({
        success: true
    });
}