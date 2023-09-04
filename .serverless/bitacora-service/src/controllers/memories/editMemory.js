const { createMemory, deleteMemory } = require("../../models/memories");
const errors = require("../../misc/errors");
const { uploadFile, deleteFiles } = require("../../misc/cloudinary");

module.exports = (db) => async (req, res, next) => {
    const { originalTitle, title, description = null, notebook = null, location, date, latitude, longitude, public = true, multimedia_url } = req.body;
    const { email } = res.locals;

    const deleteResponse = await deleteMemory(await db)(originalTitle, email);

    console.log(deleteResponse);

    if(!deleteResponse.ok) return next(errors[500]);

    const response = await createMemory(await db)(title, description, notebook, location, date, latitude, longitude, public, multimedia_url, email)

    if(!response.ok) return next(errors[500]);

    const bufferArray = req.files.map(file => file.buffer) || null;

    if(bufferArray){
        for(let buffer of bufferArray){
            await uploadFile(buffer, multimedia_url)
        }
    }

    res.status(200).json({
        success: true
    })
}