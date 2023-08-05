const errors = require("../../misc/errors");

module.exports = () => async (req, res, next) => {
    const { username } = res.locals;

    if(!username) return next(errors[500]);

    res.status(200).json({
        success: true,
        data: username
    })
}