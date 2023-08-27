const { createMemory, deleteMemory } = require("../../models/memories");
const errors = require("../../misc/errors");
const { uploadFile } = require("../../misc/cloudinary");

module.exports = (db) => async (req, res, next) => {
    const { originalTitle, title, description = null, notebook = null, location, date, latitude, longitude, public = true, multimedia_url, bufferArray = null } = req.body;
    const { email } = res.locals;

    if(bufferArray){
        for(let buffer of bufferArray){
            uploadFile(buffer, multimedia_url);
        }
    }

    const deleteResponse = await deleteMemory(await db)(originalTitle, email);

    if(!deleteResponse.ok) return next(errors[500]);

    const response = await createMemory(await db)(title, description, notebook, location, date, latitude, longitude, public, multimedia_url, email)

    if(!response.ok) return next(errors[500]);

    res.status(200).json({
        success: true
    })
}