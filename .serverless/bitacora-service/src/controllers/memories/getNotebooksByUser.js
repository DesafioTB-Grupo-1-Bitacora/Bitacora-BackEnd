const { getNotebooksByUser } = require("../../models/memories");
const errors = require("../../misc/errors");

module.exports = (db) => async (req, res, next) => {
    const { email } = res.locals;

    const response = await getNotebooksByUser(await db)(email);

    if(!response.ok) return next(errors[500]);

    res.status(200).json({
        success: true,
        data: response.content
    })
}