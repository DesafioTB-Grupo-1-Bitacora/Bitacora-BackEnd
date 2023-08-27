const { createMemory } = require("../../models/memories");
const { checkFolder, createFolder, uploadFile } = require("../../misc/cloudinary");
const errors = require("../../misc/errors");

module.exports = (db) => async (req, res, next) => {
    const { title, description = null, notebook = null, location, date, latitude, longitude, public = true, multimedia_url } = req.body;
    const { email } = res.locals;

    const bufferArray = req.files.map(file => file.buffer);

    createFolder(multimedia_url);

    if(bufferArray){
        for(let buffer of bufferArray){
            await uploadFile(buffer, multimedia_url)
        }
    }

    const response = await createMemory(await db)(title, description, notebook, location, date, latitude, longitude, public, multimedia_url, email)

    if(!response.ok) return next(errors[500]);

    res.status(200).json({
        success: true
    })
}

