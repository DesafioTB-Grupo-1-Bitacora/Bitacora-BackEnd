const { deleteMemory } = require("../../models/memories");
const { deleteFiles } = require("../../misc/cloudinary");
const errors = require("../../misc/errors");

module.exports = (db) => async (req, res, next) => {
    const { title, multimedia_url } = req.body;
    const { email } = res.locals;
    
    const response = await deleteMemory(await db)(title, email);
    
    if(!response.ok) return next(errors[500]);
    
    await deleteFiles(multimedia_url);
    
    res.status(200).json({
        success: true
    })
}