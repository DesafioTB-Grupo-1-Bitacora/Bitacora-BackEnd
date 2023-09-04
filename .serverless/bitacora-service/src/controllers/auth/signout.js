const { clearCookie } = require("../../misc/authUtils");

module.exports = () => async (req, res, next) => {
    clearCookie(res);

    res.status(200).json({
        success: true,
    })
}